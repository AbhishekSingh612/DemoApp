import {db} from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import {type User} from "$lib/server/db/schema";
import {and, eq} from "drizzle-orm";
import {generateUserId} from "$lib/utils";
import {hash} from "@node-rs/argon2";

export async function getEmailAuthByEmail(email: string) {
    return db
        .select({
            userId: table.users.userId,
            email: table.users.email,
            passwordHash: table.emailAuth.passwordHash
        })
        .from(table.users)
        .innerJoin(table.emailAuth, eq(table.emailAuth.userId, table.users.userId))
        .where(eq(table.users.email, email));
}


export async function getUserByEmail(email: string) {
    return db.select()
        .from(table.users)
        .where(eq(table.users.email, email));
}

export async function getUserAuthByEmail(email: string) {
    return db.select({
        userId: table.users.userId,
        email: table.users.email,
    })
    .from(table.users)
    .innerJoin(table.emailAuth, eq(table.emailAuth.userId, table.users.userId))
    .where(eq(table.users.email, email));
}

export async function createUserRecord(email: string, firstName: string, lastName: string) {
    // const userId = generateUserId();
    const user: User = (await db.insert(table.users)
        .values({
            email,
            firstName,
            lastName
        })
        .returning())[0];
    return user;
}

async function createEmailAuthRecord(userId: string, passwordHash: string) {
    await db.insert(table.emailAuth).values({
        userId: userId,
        passwordHash
    });
}

export async function registerUserByEmail(email: string, password: string, firstName: string, lastName: string) {
    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    const [existingUser] = await getUserByEmail(email);
    if (existingUser) {
        await createEmailAuthRecord(existingUser.userId, passwordHash);
        return existingUser;
    }

    const user = await createUserRecord(email, firstName, lastName);
    await createEmailAuthRecord(user.userId, passwordHash);
    return user;
}

export async function getUserBySessionId(sessionId: string) {
    const [result] = await db.select({
        // Adjust user table here to tweak returned data
        user: {
            id: table.users.userId,
            email: table.users.email,
            firstName: table.users.firstName,
            lastName: table.users.lastName
        },
        session: table.session
    })
        .from(table.session)
        .innerJoin(table.users, eq(table.session.userId, table.users.userId))
        .where(eq(table.session.id, sessionId));
    return result;
}

export async function deleteSessionById(sessionId: string) {
    await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export async function updateSessionExpiration(sessionId: string, expiresAt: Date) {
    await db
        .update(table.session)
        .set({expiresAt: expiresAt})
        .where(eq(table.session.id, sessionId));
}

export async function createSessionRecord(session: table.Session) {
    await db.insert(table.session).values(session);
}

export async function getOAuthUserByProviderIdAndProvider(providerUserId: any, provider: string = "google") {
    const [result] = await db.select()
        .from(table.oauthAuth)
        .where(and(
            eq(table.oauthAuth.provider, provider),
            eq(table.oauthAuth.providerUserId, providerUserId)
        ));

    if (!result) {
        return null;
    }
    return result;
}

export async function getOAuthUserByProviderId(providerUserId: any) {
    const [result] = await db.select()
        .from(table.oauthAuth)
        .where(eq(table.oauthAuth.providerUserId, providerUserId));

    if (!result) {
        return null;
    }
    return result;
}

async function createOAuthUserRecord(userId: any, provider: string, providerUserId: string, username: any = null) {
    await db.insert(table.oauthAuth)
        .values({
            userId: userId,
            provider: provider,
            providerUserId: providerUserId,
            username: username
        });
}

export async function createOAuthUser(provider: string, providerUserId: string, firstname: any, lastname: any, email: any) {
    const [existingUser] = await getUserByEmail(email);
    if (existingUser) {
        await createOAuthUserRecord(existingUser.userId, provider, providerUserId, email);
        return existingUser.userId;
    }

    const user = await createUserRecord(email, firstname, lastname);
    await createOAuthUserRecord(user.userId, provider, providerUserId);
    return user.userId;
}