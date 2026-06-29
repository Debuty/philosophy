-- =============================================================================
-- Philos - SQL Server Database Schema
-- Replaces Supabase (PostgreSQL) tables: Users/profiles, Philosophers,
-- philosopher_bio, articles, article_reactions, article_reaction_counts, comments
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Users & Authentication
-- -----------------------------------------------------------------------------

CREATE TABLE Users (
    Id              UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email           NVARCHAR(320)  NOT NULL,
    PasswordHash    NVARCHAR(255)  NOT NULL,
    EmailConfirmed  BIT            NOT NULL DEFAULT 0,
    Phone           NVARCHAR(20)   NULL,
    CreatedAt       DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);

CREATE TABLE Profiles (
    Id                  UNIQUEIDENTIFIER PRIMARY KEY,
    Username            NVARCHAR(50)   NOT NULL,
    FullName            NVARCHAR(200)  NULL,
    Bio                 NVARCHAR(MAX)  NULL,
    AvatarUrl           NVARCHAR(500)  NULL,
    ArticlesCount       INT            NOT NULL DEFAULT 0,
    BooksToReadCount    INT            NOT NULL DEFAULT 0,
    BooksReadingCount   INT            NOT NULL DEFAULT 0,
    BooksReadCount      INT            NOT NULL DEFAULT 0,
    BooksFavoritesCount INT            NOT NULL DEFAULT 0,
    CreatedAt           DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Profiles_Users FOREIGN KEY (Id) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_Profiles_Username UNIQUE (Username)
);

CREATE TABLE PasswordResetTokens (
    Id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId    UNIQUEIDENTIFIER NOT NULL,
    Token     NVARCHAR(255)    NOT NULL,
    ExpiresAt DATETIME2        NOT NULL,
    UsedAt    DATETIME2        NULL,
    CONSTRAINT FK_PasswordResetTokens_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_PasswordResetTokens_Token UNIQUE (Token)
);

CREATE TABLE RefreshTokens (
    Id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId    UNIQUEIDENTIFIER NOT NULL,
    Token     NVARCHAR(500)    NOT NULL,
    ExpiresAt DATETIME2        NOT NULL,
    RevokedAt DATETIME2        NULL,
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_RefreshTokens_Token UNIQUE (Token)
);

-- -----------------------------------------------------------------------------
-- 2. Philosophers
-- -----------------------------------------------------------------------------

CREATE TABLE Philosophers (
    Id                 INT IDENTITY(1,1) PRIMARY KEY,
    NameEn             NVARCHAR(200) NOT NULL,
    NameAr             NVARCHAR(200) NOT NULL,
    Birth              INT           NULL,
    Death              INT           NULL,
    EraEn              NVARCHAR(100) NULL,
    EraAr              NVARCHAR(100) NULL,
    EraSlug            NVARCHAR(50)  NULL,  -- ancient, medieval, earlyModern, modern, contemporary
    NationalityEn      NVARCHAR(100) NULL,
    NationalityAr      NVARCHAR(100) NULL,
    SchoolEn           NVARCHAR(100) NULL,
    SchoolAr           NVARCHAR(100) NULL,
    SchoolSlug         NVARCHAR(50)  NULL,  -- idealism, materialism, existentialism, etc.
    QuoteEn            NVARCHAR(500) NULL,
    QuoteAr            NVARCHAR(500) NULL,
    ShortDescriptionEn NVARCHAR(MAX) NULL,
    ShortDescriptionAr NVARCHAR(MAX) NULL,
    ImageUrl           NVARCHAR(500) NULL,
    CreatedAt          DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE INDEX IX_Philosophers_EraSlug    ON Philosophers(EraSlug);
CREATE INDEX IX_Philosophers_SchoolSlug ON Philosophers(SchoolSlug);
CREATE INDEX IX_Philosophers_NameEn     ON Philosophers(NameEn);
CREATE INDEX IX_Philosophers_NameAr     ON Philosophers(NameAr);

-- -----------------------------------------------------------------------------
-- 3. Philosopher Bios (replaces philosopher_bio)
-- -----------------------------------------------------------------------------

CREATE TABLE PhilosopherBios (
    PhilosopherId     INT PRIMARY KEY,
    NameEn            NVARCHAR(200) NULL,
    NameAr            NVARCHAR(200) NULL,
    Birth             INT           NULL,
    Death             INT           NULL,
    NationalityEn     NVARCHAR(100) NULL,
    NationalityAr     NVARCHAR(100) NULL,
    EraEn             NVARCHAR(100) NULL,
    EraAr             NVARCHAR(100) NULL,
    SchoolEn          NVARCHAR(100) NULL,
    SchoolAr          NVARCHAR(100) NULL,
    IntroEn           NVARCHAR(MAX) NULL,
    IntroAr           NVARCHAR(MAX) NULL,
    EarlyLifeEn       NVARCHAR(MAX) NULL,
    EarlyLifeAr       NVARCHAR(MAX) NULL,
    EducationEn       NVARCHAR(MAX) NULL,
    EducationAr       NVARCHAR(MAX) NULL,
    BooksEn           NVARCHAR(MAX) NULL,
    BooksAr           NVARCHAR(MAX) NULL,
    MetaphysicsEn     NVARCHAR(MAX) NULL,
    MetaphysicsAr     NVARCHAR(MAX) NULL,
    EpistemologyEn    NVARCHAR(MAX) NULL,
    EpistemologyAr    NVARCHAR(MAX) NULL,
    EthicsEn          NVARCHAR(MAX) NULL,
    EthicsAr          NVARCHAR(MAX) NULL,
    PoliticsEn        NVARCHAR(MAX) NULL,
    PoliticsAr        NVARCHAR(MAX) NULL,
    InfluenceLegacyEn NVARCHAR(MAX) NULL,
    InfluenceLegacyAr NVARCHAR(MAX) NULL,
    PersonalLifeEn    NVARCHAR(MAX) NULL,
    PersonalLifeAr    NVARCHAR(MAX) NULL,
    DeathSectionEn    NVARCHAR(MAX) NULL,
    DeathSectionAr    NVARCHAR(MAX) NULL,
    FurtherReadingEn  NVARCHAR(MAX) NULL,
    FurtherReadingAr  NVARCHAR(MAX) NULL,
    ReferencesEn      NVARCHAR(MAX) NULL,
    ReferencesAr      NVARCHAR(MAX) NULL,
    CONSTRAINT FK_PhilosopherBios_Philosophers FOREIGN KEY (PhilosopherId) REFERENCES Philosophers(Id) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 4. Articles
-- -----------------------------------------------------------------------------

CREATE TABLE Articles (
    Id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title     NVARCHAR(300)    NOT NULL,
    Subtitle  NVARCHAR(500)    NOT NULL,
    Content   NVARCHAR(MAX)    NOT NULL,
    Category  NVARCHAR(100)    NOT NULL,
    State     NVARCHAR(20)     NOT NULL DEFAULT 'draft',
    AuthorId  UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_Articles_State CHECK (State IN ('draft', 'published')),
    CONSTRAINT FK_Articles_Users FOREIGN KEY (AuthorId) REFERENCES Users(Id)
);

CREATE INDEX IX_Articles_State     ON Articles(State);
CREATE INDEX IX_Articles_AuthorId  ON Articles(AuthorId);
CREATE INDEX IX_Articles_CreatedAt ON Articles(CreatedAt DESC);

-- -----------------------------------------------------------------------------
-- 5. Article Reactions (replaces article_reactions)
-- -----------------------------------------------------------------------------

CREATE TABLE ArticleReactions (
    ArticleId UNIQUEIDENTIFIER NOT NULL,
    UserId    UNIQUEIDENTIFIER NOT NULL,
    Reaction  NVARCHAR(10)     NOT NULL,
    CreatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_ArticleReactions PRIMARY KEY (ArticleId, UserId),
    CONSTRAINT CK_ArticleReactions_Reaction CHECK (Reaction IN ('like', 'dislike')),
    CONSTRAINT FK_ArticleReactions_Articles FOREIGN KEY (ArticleId) REFERENCES Articles(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ArticleReactions_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Replaces Supabase article_reaction_counts view
CREATE VIEW ArticleReactionCounts AS
SELECT
    a.Id AS ArticleId,
    ISNULL(SUM(CASE WHEN r.Reaction = 'like'    THEN 1 ELSE 0 END), 0) AS Likes,
    ISNULL(SUM(CASE WHEN r.Reaction = 'dislike' THEN 1 ELSE 0 END), 0) AS Dislikes
FROM Articles a
LEFT JOIN ArticleReactions r ON r.ArticleId = a.Id
GROUP BY a.Id;

-- -----------------------------------------------------------------------------
-- 6. Comments
-- -----------------------------------------------------------------------------

CREATE TABLE Comments (
    Id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ArticleId UNIQUEIDENTIFIER NOT NULL,
    UserId    UNIQUEIDENTIFIER NOT NULL,
    Content   NVARCHAR(MAX)    NOT NULL,
    CreatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Comments_Articles FOREIGN KEY (ArticleId) REFERENCES Articles(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE INDEX IX_Comments_ArticleId ON Comments(ArticleId, CreatedAt DESC);

-- -----------------------------------------------------------------------------
-- 7. Article Bookmarks (replaces local-only React state)
-- -----------------------------------------------------------------------------

CREATE TABLE ArticleBookmarks (
    UserId    UNIQUEIDENTIFIER NOT NULL,
    ArticleId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_ArticleBookmarks PRIMARY KEY (UserId, ArticleId),
    CONSTRAINT FK_ArticleBookmarks_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ArticleBookmarks_Articles FOREIGN KEY (ArticleId) REFERENCES Articles(Id) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 8. Schools (future: /schools, /schools/:id)
-- -----------------------------------------------------------------------------

CREATE TABLE Schools (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    NameEn        NVARCHAR(200) NOT NULL,
    NameAr        NVARCHAR(200) NOT NULL,
    Slug          NVARCHAR(100) NOT NULL,
    DescriptionEn NVARCHAR(MAX) NULL,
    DescriptionAr NVARCHAR(MAX) NULL,
    FoundedPeriod NVARCHAR(100) NULL,
    ImageUrl      NVARCHAR(500) NULL,
    CONSTRAINT UQ_Schools_Slug UNIQUE (Slug)
);

CREATE TABLE PhilosopherSchools (
    PhilosopherId INT NOT NULL,
    SchoolId      INT NOT NULL,
    CONSTRAINT PK_PhilosopherSchools PRIMARY KEY (PhilosopherId, SchoolId),
    CONSTRAINT FK_PhilosopherSchools_Philosophers FOREIGN KEY (PhilosopherId) REFERENCES Philosophers(Id) ON DELETE CASCADE,
    CONSTRAINT FK_PhilosopherSchools_Schools FOREIGN KEY (SchoolId) REFERENCES Schools(Id) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 9. Books (future: /books, /books/:id, profile stats)
-- -----------------------------------------------------------------------------

CREATE TABLE Books (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    TitleEn       NVARCHAR(300) NOT NULL,
    TitleAr       NVARCHAR(300) NOT NULL,
    AuthorEn      NVARCHAR(200) NULL,
    AuthorAr      NVARCHAR(200) NULL,
    DescriptionEn NVARCHAR(MAX) NULL,
    DescriptionAr NVARCHAR(MAX) NULL,
    CoverImageUrl NVARCHAR(500) NULL,
    PublishedYear INT           NULL
);

CREATE TABLE UserBookLists (
    UserId   UNIQUEIDENTIFIER NOT NULL,
    BookId   INT              NOT NULL,
    ListType NVARCHAR(20)     NOT NULL,
    AddedAt  DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_UserBookLists PRIMARY KEY (UserId, BookId, ListType),
    CONSTRAINT CK_UserBookLists_ListType CHECK (ListType IN ('to_read', 'reading', 'read', 'favorite')),
    CONSTRAINT FK_UserBookLists_Users FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_UserBookLists_Books FOREIGN KEY (BookId) REFERENCES Books(Id) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 10. Timeline (future: /timeline)
-- -----------------------------------------------------------------------------

CREATE TABLE TimelineEvents (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    [Year]        INT           NOT NULL,
    TitleEn       NVARCHAR(300) NOT NULL,
    TitleAr       NVARCHAR(300) NOT NULL,
    DescriptionEn NVARCHAR(MAX) NULL,
    DescriptionAr NVARCHAR(MAX) NULL,
    PhilosopherId INT           NULL,
    SchoolId      INT           NULL,
    CONSTRAINT FK_TimelineEvents_Philosophers FOREIGN KEY (PhilosopherId) REFERENCES Philosophers(Id),
    CONSTRAINT FK_TimelineEvents_Schools FOREIGN KEY (SchoolId) REFERENCES Schools(Id)
);

CREATE INDEX IX_TimelineEvents_Year ON TimelineEvents([Year]);

-- -----------------------------------------------------------------------------
-- Triggers
-- -----------------------------------------------------------------------------

-- Auto-create profile when a user signs up
GO
CREATE TRIGGER TR_Users_AfterInsert
ON Users
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Profiles (Id, Username)
    SELECT
        i.Id,
        LEFT(REPLACE(i.Email, '@', '_'), 50)
    FROM inserted i;
END;
GO

-- Keep ArticlesCount in sync when article state changes
CREATE TRIGGER TR_Articles_AfterInsert
ON Articles
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE p
    SET
        p.ArticlesCount = p.ArticlesCount + 1,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN inserted i ON i.AuthorId = p.Id
    WHERE i.State = 'published';
END;
GO

CREATE TRIGGER TR_Articles_AfterUpdate
ON Articles
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- draft -> published
    UPDATE p
    SET
        p.ArticlesCount = p.ArticlesCount + 1,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN inserted i ON i.AuthorId = p.Id
    INNER JOIN deleted d ON d.Id = i.Id
    WHERE d.State = 'draft' AND i.State = 'published';

    -- published -> draft
    UPDATE p
    SET
        p.ArticlesCount = CASE WHEN p.ArticlesCount > 0 THEN p.ArticlesCount - 1 ELSE 0 END,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN inserted i ON i.AuthorId = p.Id
    INNER JOIN deleted d ON d.Id = i.Id
    WHERE d.State = 'published' AND i.State = 'draft';
END;
GO

CREATE TRIGGER TR_Articles_AfterDelete
ON Articles
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE p
    SET
        p.ArticlesCount = CASE WHEN p.ArticlesCount > 0 THEN p.ArticlesCount - 1 ELSE 0 END,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN deleted d ON d.AuthorId = p.Id
    WHERE d.State = 'published';
END;
GO

-- Keep book list counts in sync on Profiles
CREATE TRIGGER TR_UserBookLists_AfterInsert
ON UserBookLists
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE p
    SET
        p.BooksToReadCount    = p.BooksToReadCount    + CASE WHEN i.ListType = 'to_read'   THEN 1 ELSE 0 END,
        p.BooksReadingCount   = p.BooksReadingCount   + CASE WHEN i.ListType = 'reading'   THEN 1 ELSE 0 END,
        p.BooksReadCount      = p.BooksReadCount      + CASE WHEN i.ListType = 'read'      THEN 1 ELSE 0 END,
        p.BooksFavoritesCount = p.BooksFavoritesCount + CASE WHEN i.ListType = 'favorite'  THEN 1 ELSE 0 END,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN inserted i ON i.UserId = p.Id;
END;
GO

CREATE TRIGGER TR_UserBookLists_AfterDelete
ON UserBookLists
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE p
    SET
        p.BooksToReadCount    = CASE WHEN p.BooksToReadCount    > 0 THEN p.BooksToReadCount    - CASE WHEN d.ListType = 'to_read'   THEN 1 ELSE 0 END ELSE 0 END,
        p.BooksReadingCount   = CASE WHEN p.BooksReadingCount   > 0 THEN p.BooksReadingCount   - CASE WHEN d.ListType = 'reading'   THEN 1 ELSE 0 END ELSE 0 END,
        p.BooksReadCount      = CASE WHEN p.BooksReadCount      > 0 THEN p.BooksReadCount      - CASE WHEN d.ListType = 'read'      THEN 1 ELSE 0 END ELSE 0 END,
        p.BooksFavoritesCount = CASE WHEN p.BooksFavoritesCount > 0 THEN p.BooksFavoritesCount - CASE WHEN d.ListType = 'favorite'  THEN 1 ELSE 0 END ELSE 0 END,
        p.UpdatedAt = SYSUTCDATETIME()
    FROM Profiles p
    INNER JOIN deleted d ON d.UserId = p.Id;
END;
GO
