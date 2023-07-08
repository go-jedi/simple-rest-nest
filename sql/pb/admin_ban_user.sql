CREATE OR REPLACE FUNCTION admin_ban_user(js json)
    RETURNS boolean
    LANGUAGE plpgsql
AS $function$
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
$function$