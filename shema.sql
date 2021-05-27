CREATE TABLE "compte" (
	"id"	INTEGER,
	"dhc"	INTEGER,
	"datax"	BLOB
);

CREATE TABLE "secret" ("id"	BLOB, "dhc"	INTEGER, "data"	TEXT, PRIMARY KEY("id")) WITHOUT ROWID;

CREATE TABLE "functions"          ( "name"        TEXT    PRIMARY KEY  NOT NULL
                                  , "body"        TEXT                 NOT NULL
                                  , "argLength"   INTEGER
                                  , "aggregate"   INTEGER              NOT NULL DEFAULT 0
                                  , "enabled"     INTEGER              NOT NULL DEFAULT 1
                                  , "extraInfo"   TEXT
                                  );

INSERT INTO "functions" ("name", "body", "argLength", "aggregate", "enabled", "extraInfo")
VALUES('gr'
      ,' var = id = avalues.getBytes(0);
        return input.replace(new RegExp(regex,flags), substitute);
       '
      ,1
      ,0
      ,1
      ,''
      );

CREATE INDEX secret_gr_dhc ON secret (gr(id), dhc);
