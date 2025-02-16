import {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    primaryKey,
    uniqueIndex,
} from "drizzle-orm/pg-core";

// 1. Core Users Table: Stores general profile information
export const users = pgTable("users", {
    userId: uuid("user_id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    isEnabled: boolean("is_enabled").notNull().default(true),
    statusUpdatedAt: timestamp("status_updated_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 3. Email Authentication Table: For email/password logins
export const emailAuth = pgTable("email_auth", {
    emailAuthId: uuid("email_auth_id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique().references(() => users.userId, { onDelete: "cascade" }),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    // salt: varchar("salt", { length: 255 }),
    emailVerified: boolean("email_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 4. OAuth Authentication Table: For external providers (e.g., Google, Facebook)
export const oauthAuth = pgTable("oauth_auth", {
    oauthAuthId: uuid("oauth_auth_id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.userId, { onDelete: "cascade" }),
    provider: varchar("provider", { length: 100 }).notNull(),
    providerUserId: varchar("provider_user_id", { length: 255 }).notNull(),
    username: varchar("username", { length: 100 }),
    // accessToken: varchar("access_token", { length: 255 }),
    // refreshToken: varchar("refresh_token", { length: 255 }),
    // tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    },
    (oauthAuth) => [
        uniqueIndex("unique_provider_user").on(oauthAuth.provider, oauthAuth.providerUserId)
    ]
);

/*
// 5a. Roles Table: Defines roles for authorization
export const roles = pgTable("roles", {
    roleId: uuid("role_id").primaryKey().defaultRandom(),
    roleName: varchar("role_name", { length: 100 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

// 5b. User Roles Junction Table: Associates users with roles (many-to-many)
export const userRoles = pgTable(
    "user_roles",
    {
        userId: uuid("user_id")
            .notNull()
            .references(() => users.userId, { onDelete: "cascade" }),
        roleId: uuid("role_id")
            .notNull()
            .references(() => roles.roleId, { onDelete: "cascade" }),
        assignedAt: timestamp("assigned_at", { withTimezone: true })
            .defaultNow()
            .notNull(),
    },
    (userRoles) => [
        primaryKey(userRoles.userId, userRoles.roleId)
    ]
);
*/

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.userId, { onDelete: "cascade" }),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof session.$inferSelect;
export type EmailAuth = typeof emailAuth.$inferSelect;
export type OauthAuth = typeof oauthAuth.$inferSelect;
