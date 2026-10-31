# Connect Mels Journal to Supabase

Supabase is the online database for your stories and photos. Do these steps once in the Supabase project called `travel-journal`.

## 1. Create the tables and photo folder

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and open the `travel-journal` project.
2. In this project, choose **SQL Editor**, then **New query**.
3. In VS Code, open this project's `supabase/setup.sql` file. Copy all of its contents, paste them into the SQL Editor, and click **Run**.
4. The query creates the stories table, the `memory-photos` storage bucket, and the access rules. The last few lines try to give your email editing permission. If you have not created your Supabase account yet, those lines do not find a user; you will run them again in step 3.

## 2. Create your sign-in account

1. In Supabase, go to **Authentication → Users** and choose **Add user → Send invitation**.
2. Enter `melisfildis@gmail.com` and send the invitation.
3. Open the invitation email and follow its link to finish setting up the account and choose a password. The website needs this password; entering only your email is not enough.

If you already accepted an invitation, use the password you chose then. If you never received one, check spam and resend the invitation from **Authentication → Users**.

## 3. Give your account permission to edit

After you accept the invitation, go back to **SQL Editor → New query**. Copy and run only these lines:

```sql
insert into public.journal_admins (user_id)
select id from auth.users where email = 'melisfildis@gmail.com'
on conflict (user_id) do nothing;
```

This connects your sign-in account to the journal's editor permission.

## 4. Sign in and upload photos

1. Open the journal website and click **Sign in**.
2. Enter `melisfildis@gmail.com` and the password you chose when accepting the invitation.
3. When the site says the online journal is connected and you are signed in, choose **Write a memory** or **Edit this memory**.
4. Choose a JPG, PNG, or WebP photo, then click **Save memory** or **Save changes**. The photo is uploaded into Supabase Storage when you save.
5. To update one of the existing country posts, click **Edit post** on its card, make your changes, and save the post. Changes use the same `memories` table, so no extra SQL setup is needed.

## Profile

After signing in, choose **Profile** in the top navigation. It shows the signed-in email and contains the **Change password** and **Sign out** actions.

## Enable destination-card editing and photo galleries

Because this Supabase project was set up before these features were added, run the migration once:

1. In Supabase, open **SQL Editor → New query**.
2. In VS Code, open `supabase/updates/add-destination-editor-and-photo-galleries.sql` and copy all of it into the SQL Editor.
3. Click **Run**, then refresh the website.

After that, signed-in editors can choose **Edit card** on a destination. This migration also adds the Turkish translation fields for destination cards and blog posts, plus the table used to remember deleted built-in posts. In the editor, fill in the Turkish fields to show a translated version; when a translation is blank, visitors see the English text instead. Post editors can upload a cover and up to six extra photos and remove gallery photos. Gallery photos appear in a compact, tall portrait layout (three columns on desktop and two on phones), with the full image visible. Uploads are fitted without cropping into 480 × 640 portrait images, then sent to the existing `memory-photos` bucket when you save. Typical iPhone portrait photos fill that frame; wider photos have a neutral margin so the full picture remains visible. Selecting a blog card opens its own post page, and **About** opens a separate page. On a post page, the journal owner can edit or delete the post. Delete asks for confirmation, permanently removes its saved row from `memories`, and hides built-in posts from the journal.

The **EN / TR** selector in the header changes the site language and remembers your choice in that browser. The built-in interface is translated. Add Turkish titles, place names, stories, and destination-card text through the editor to translate your personal writing too.

## Password reset and change

Before using **Forgot password?**, open **Authentication → URL Configuration** in Supabase. Add the local website URL to **Redirect URLs** (Vite normally uses `http://localhost:5173/**`). If the website is published, also add its full URL including any path, for example `https://your-site.example/**` or `https://username.github.io/repository/**`. The reset email returns to the same page where you requested it, and Supabase only redirects to URLs on this allowlist.

On the website, choose **Sign in → Forgot password?**, enter your account email, and request a link. Open the email on the same browser/device as the website, choose a new password, and save it. If there is no Supabase user yet, first invite the email under **Authentication → Users** and accept the invitation; a reset request cannot create an account. Supabase's default email sender is limited and best-effort, so check spam or configure custom SMTP if messages do not arrive.

When already signed in, use **Change password** under **Write a memory**. Enter your current password and the new password twice.

## If sign-in still does not work

- “Invalid login credentials” usually means the invitation was not accepted yet, or the password is not the one chosen for that account. Check **Authentication → Users** to see whether your email is listed, then resend the invitation if needed.
- “This account has not been given journal editing access” means step 3 has not been run after creating your user.
- “Database setup needed” means step 1 has not completed successfully, or this app is connected to a different Supabase project. The small status message under **Write a memory** can show more detail when you hover over it.
- A successful password reset request may show a generic message even if the email has no Supabase account; this protects account privacy. Create/invite the user first if the reset email never arrives.

## App connection details

The local app reads the Project URL and publishable key from `.env.local` in the project folder. Restart the local development server after changing that file. For an online deployment, add the same two values to the hosting provider's environment variables and redeploy.

The publishable key is intended for browser apps. Never add a Supabase secret key (`sb_secret_...`) or database password to this React app.
