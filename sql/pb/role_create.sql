CREATE OR REPLACE FUNCTION role_create(js json)
    RETURNS boolean
    LANGUAGE plpgsql
AS $function$
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
$function$