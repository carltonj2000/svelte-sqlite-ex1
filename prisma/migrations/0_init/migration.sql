-- CreateTable
CREATE TABLE "albums" (
    "AlbumId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "ArtistId" INTEGER NOT NULL,
    CONSTRAINT "albums_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "artists" ("ArtistId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "artists" (
    "ArtistId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT
);

-- CreateTable
CREATE TABLE "customers" (
    "CustomerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Company" TEXT,
    "Address" TEXT,
    "City" TEXT,
    "State" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Phone" TEXT,
    "Fax" TEXT,
    "Email" TEXT NOT NULL,
    "SupportRepId" INTEGER,
    CONSTRAINT "customers_SupportRepId_fkey" FOREIGN KEY ("SupportRepId") REFERENCES "employees" ("EmployeeId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "employees" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LastName" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "Title" TEXT,
    "ReportsTo" INTEGER,
    "BirthDate" DATETIME,
    "HireDate" DATETIME,
    "Address" TEXT,
    "City" TEXT,
    "State" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Phone" TEXT,
    "Fax" TEXT,
    "Email" TEXT,
    CONSTRAINT "employees_ReportsTo_fkey" FOREIGN KEY ("ReportsTo") REFERENCES "employees" ("EmployeeId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "genres" (
    "GenreId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "InvoiceLineId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InvoiceId" INTEGER NOT NULL,
    "TrackId" INTEGER NOT NULL,
    "UnitPrice" DECIMAL NOT NULL,
    "Quantity" INTEGER NOT NULL,
    CONSTRAINT "invoice_items_TrackId_fkey" FOREIGN KEY ("TrackId") REFERENCES "tracks" ("TrackId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "invoice_items_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES "invoices" ("InvoiceId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "invoices" (
    "InvoiceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerId" INTEGER NOT NULL,
    "InvoiceDate" DATETIME NOT NULL,
    "BillingAddress" TEXT,
    "BillingCity" TEXT,
    "BillingState" TEXT,
    "BillingCountry" TEXT,
    "BillingPostalCode" TEXT,
    "Total" DECIMAL NOT NULL,
    CONSTRAINT "invoices_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "customers" ("CustomerId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "media_types" (
    "MediaTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT
);

-- CreateTable
CREATE TABLE "playlist_track" (
    "PlaylistId" INTEGER NOT NULL,
    "TrackId" INTEGER NOT NULL,

    PRIMARY KEY ("PlaylistId", "TrackId"),
    CONSTRAINT "playlist_track_TrackId_fkey" FOREIGN KEY ("TrackId") REFERENCES "tracks" ("TrackId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "playlist_track_PlaylistId_fkey" FOREIGN KEY ("PlaylistId") REFERENCES "playlists" ("PlaylistId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "playlists" (
    "PlaylistId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT
);

-- CreateTable
CREATE TABLE "tracks" (
    "TrackId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "AlbumId" INTEGER,
    "MediaTypeId" INTEGER NOT NULL,
    "GenreId" INTEGER,
    "Composer" TEXT,
    "Milliseconds" INTEGER NOT NULL,
    "Bytes" INTEGER,
    "UnitPrice" DECIMAL NOT NULL,
    CONSTRAINT "tracks_MediaTypeId_fkey" FOREIGN KEY ("MediaTypeId") REFERENCES "media_types" ("MediaTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tracks_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "genres" ("GenreId") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tracks_AlbumId_fkey" FOREIGN KEY ("AlbumId") REFERENCES "albums" ("AlbumId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE INDEX "IFK_AlbumArtistId" ON "albums"("ArtistId");

-- CreateIndex
CREATE INDEX "IFK_CustomerSupportRepId" ON "customers"("SupportRepId");

-- CreateIndex
CREATE INDEX "IFK_EmployeeReportsTo" ON "employees"("ReportsTo");

-- CreateIndex
CREATE INDEX "IFK_InvoiceLineTrackId" ON "invoice_items"("TrackId");

-- CreateIndex
CREATE INDEX "IFK_InvoiceLineInvoiceId" ON "invoice_items"("InvoiceId");

-- CreateIndex
CREATE INDEX "IFK_InvoiceCustomerId" ON "invoices"("CustomerId");

-- CreateIndex
CREATE INDEX "IFK_PlaylistTrackTrackId" ON "playlist_track"("TrackId");

-- CreateIndex
CREATE INDEX "IFK_TrackMediaTypeId" ON "tracks"("MediaTypeId");

-- CreateIndex
CREATE INDEX "IFK_TrackGenreId" ON "tracks"("GenreId");

-- CreateIndex
CREATE INDEX "IFK_TrackAlbumId" ON "tracks"("AlbumId");

