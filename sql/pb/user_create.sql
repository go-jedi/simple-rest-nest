CREATE OR REPLACE FUNCTION user_create(js json, _uid character varying)
	RETURNS boolean
	LANGUAGE plpgsql
AS $function$
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
$function$