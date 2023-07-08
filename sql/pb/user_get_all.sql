CREATE OR REPLACE FUNCTION user_get_all()
    RETURNS json
    LANGUAGE plpgsql
AS $function$
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
$function$