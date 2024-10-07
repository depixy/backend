ALTER TABLE "_ChildTags" ADD CONSTRAINT "TAG_SELF_REF" CHECK ("A" != "B");

CREATE OR REPLACE FUNCTION detect_cycle()
  RETURNS TRIGGER
  LANGUAGE plpgsql AS
$func$
BEGIN
  IF EXISTS (
    SELECT * FROM "_ChildTags" a WHERE a."A" = NEW."A" AND EXISTS (
      SELECT * FROM "_ChildTags" b WHERE b."B" = a."A" AND a."B" = b."A"
    )
    LIMIT 1
  )
  THEN
    RAISE EXCEPTION 'TAG_PARENT_AND_CHILD_SAME';
  ELSIF EXISTS (
    WITH RECURSIVE search_graph("A", "B") AS (
      SELECT g."A", g."B"
      FROM "_ChildTags" g
    UNION ALL
      SELECT g."A", g."B"
      FROM "_ChildTags" g, search_graph sg
      WHERE g."A" = sg."B"
    ) CYCLE "A" SET is_cycle USING path
    SELECT * FROM search_graph WHERE is_cycle = true LIMIT 1
  )
  THEN
    RAISE EXCEPTION 'TAG_CIRCULAR_REF';
  ELSE
    RETURN NEW;
  END IF;
END
$func$;

CREATE TRIGGER "detectTagCycleAfterInsertOrUpdate" AFTER INSERT OR UPDATE ON "_ChildTags" FOR EACH ROW EXECUTE PROCEDURE detect_cycle();
