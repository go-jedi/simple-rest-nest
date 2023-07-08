CREATE OR REPLACE FUNCTION role_get_by_value(js json)
    RETURNS json
    LANGUAGE plpgsql
AS $function$
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
$function$