CREATE OR REPLACE FUNCTION user_get_by_email(_eml character varying)
    RETURNS json
	LANGUAGE plpgsql
AS $function$
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
$function$