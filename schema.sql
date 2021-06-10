CREATE TABLE IF NOT EXISTS "test1" (
	"id"	INTEGER,
	"k2"	BLOB,
	"data"	BLOB,
	PRIMARY KEY("id","k2")
);
CREATE INDEX "k2_test1" ON "test1" (
	"k2"
);
