CREATE OR REPLACE FUNCTION public.admin_ban_user(
	js json)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _u users;
BEGIN
    SELECT *
    FROM users
    WHERE id = (js->>'userId')::INTEGER
    INTO _u;

    IF _u.id ISNULL THEN
        RAISE EXCEPTION 'пользователя с таким id не существует';
    END IF;

    UPDATE users SET
        banned = TRUE,
        banReason = 'оскорбление пользователей'
    WHERE id = (js->>'userId')::INTEGER;

    RETURN TRUE;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.role_create(
	js json)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _r roles;
BEGIN
    SELECT *
    FROM roles
    WHERE value = js->>'value'
    INTO _r;

    IF _r.id ISNULL THEN
        INSERT INTO roles(
            value,
            description
        ) VALUES(
            js->>'value',
            js->>'description'
        );
        RETURN TRUE;
    ELSE
        RAISE EXCEPTION 'роль с таким названием уже существует';
    END IF;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.role_add_user(
	js json)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _u users;
    _r roles;
BEGIN
    SELECT *
    FROM users
    WHERE id = (js->>'userId')::INTEGER
    INTO _u;

    IF _u.id ISNULL THEN
        RAISE EXCEPTION 'пользователя с таким id не существует';
    END IF;

    SELECT *
    FROM roles
    WHERE id = (js->>'roleId')::INTEGER
    INTO _r;

    IF _r.id ISNULL THEN
        RAISE EXCEPTION 'роли с таким id не существует';
    END IF;

    INSERT INTO user_roles(
        user_id,
        role_id
    ) VALUES(
        (js->>'userId')::INTEGER,
        (js->>'roleId')::INTEGER
    );

    RETURN TRUE;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.role_get_by_value(
	js json)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _response JSONB;
BEGIN
    SELECT
        COALESCE(rgbv.s, '[]')
    FROM
    (
        SELECT json_agg(ag.*)::JSONB s
        FROM (
            SELECT r.id, r.value, r.description, r.created
            FROM roles r
            WHERE r.value = js->>'value'
        ) ag
    ) rgbv
    INTO _response;

    RETURN _response;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.uid(
	_cnt integer)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    chars TEXT[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,H,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z}';
    str TEXT DEFAULT '';
    i INT DEFAULT 0;
BEGIN
    LOOP
    str = '';
    FOR i IN 1.._cnt LOOP
        str := str || chars[1+random()*(array_length(chars, 1)-1)];
    END LOOP;
    EXIT WHEN NOT EXISTS(SELECT * FROM users WHERE uid = str);
    END LOOP;
    RETURN str;
END;
$BODY$;

REATE OR REPLACE FUNCTION public.user_check_exist(
	js json)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	_u users;
BEGIN
	SELECT *
	FROM users
	WHERE email = js->>'email'
	INTO _u;

    IF _u.id ISNULL THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.user_create(
	js json,
	_uid character varying)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	_u users;
	_r roles;
	_id INTEGER;
BEGIN
	SELECT *
	FROM users
	WHERE email = js->>'email'
	INTO _u;

	SELECT *
	FROM roles
	WHERE value = 'USER'
	INTO _r;

	IF _r.id ISNULL THEN
		RAISE EXCEPTION 'роли с таким названием не существует';
	END IF;

	IF _u.id ISNULL THEN
		INSERT INTO users(
			uid,
			email,
			password
		) VALUES(
			_uid,
			js->>'email',
			js->>'password'
		) RETURNING id INTO _id;
		INSERT INTO user_roles(
			user_id,
			role_id
		) VALUES(
			_id,
			_r.id
		);
		RETURN TRUE;
	ELSE
		RAISE EXCEPTION 'пользователь с таким именем уже существует';
	END IF;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.user_get_all(
	)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _response JSONB;
BEGIN
    SELECT
        COALESCE(uga.s, '[]')
    FROM
    (
        SELECT json_agg(ag.*)::JSONB s
        FROM (
            SELECT u.id, u.uid, u.email, u.password, u.banned, u.banreason, u.created
            FROM users u
        ) ag
    ) uga
    INTO _response;

    RETURN _response;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.user_get_by_email(
	_eml character varying)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _response JSONB;
BEGIN
    SELECT
        COALESCE(ugbe.s, '[]')
    FROM
    (
        SELECT json_agg(ag.*)::JSONB s
        FROM (
            SELECT u.id, u.uid, u.email, u.password, u.banned, u.banreason, u.created
            FROM users u
            WHERE u.email = _eml
        ) ag
    ) ugbe
    INTO _response;

    RETURN _response;
END;
$BODY$;