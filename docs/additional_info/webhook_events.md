# Webhook events

If you're working with [webhook events](https://developers.lokalise.com/docs/webhook-events), you take take advantage of the typings from our Node SDK.

For example, when processing `project.key.added` event:

```ts
import type { WebhookProjectKeyAdded } from "@lokalise/node-api";

const event: WebhookProjectKeyAdded = {
  // ...
};
```

The following types are exported:

```
WebhookProjectImported
WebhookProjectExported
WebhookProjectCopied
WebhookProjectDeleted
WebhookProjectSnapshotCreated
WebhookProjectBranchAdded
WebhookProjectBranchDeleted
WebhookProjectBranchMerged
WebhookProjectLanguagesAdded
WebhookProjectLanguageRemoved
WebhookProjectLanguageSettingsChanged
WebhookProjectKeyAdded
WebhookProjectKeysAdded
WebhookProjectKeyModified
WebhookProjectKeysModified
WebhookProjectKeysDeleted
WebhookProjectKeyCommentAdded
WebhookProjectTranslationUpdated
WebhookProjectTranslationsUpdated
WebhookProjectTranslationProofread
WebhookProjectTranslationsProofread
WebhookProjectContributorAdded
WebhookProjectContributorAddedPublic
WebhookProjectContributorDeleted
WebhookProjectTaskCreated
WebhookProjectTaskQueued
WebhookProjectTaskClosed
WebhookProjectTaskDeleted
WebhookProjectTaskLanguageClosed
WebhookProjectTaskInitialTmLeverageCalculated
WebhookTeamOrderCreated
WebhookTeamOrderDeleted
WebhookTeamOrderCompleted
```