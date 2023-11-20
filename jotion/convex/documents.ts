import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId != userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      await ctx.db.patch(documentId, { isArchived: true });

      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", documentId))
        .collect();

      for (const child of children) {
        await recursiveArchive(child._id);
      }
    };

    await recursiveArchive(id);
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, { parentDocument }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, { title, parentDocument }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title,
      parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
