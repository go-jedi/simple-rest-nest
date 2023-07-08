CREATE OR REPLACE FUNCTION role_add_user(js json)
    RETURNS boolean
    LANGUAGE plpgsql
AS $function$
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
$function$