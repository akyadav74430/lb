import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import ProfileForm from "@/components/ProfileForm";
import AccountForm from "@/components/AccountForm";

export const metadata = { title: "Edit Profile — lovebite.com" };

export default async function EditProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin?callbackUrl=/profile/edit");
  }

  // Fetch profile with ordered photos and user relation
  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      photos: {
        orderBy: {
          order: "asc",
        },
      },
      user: true,
    },
  });

  const user = profile?.user || (await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  }));

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">
          {profile ? "Edit your companion profile" : "Create companion profile"}
        </h1>
        <p className="page-subtitle">
          Manage your verified photos, pricing, Indian location, and privacy settings on lovebite.com.
        </p>
      </div>

      <div className="edit-page-grid">
        {/* Account section: name + email */}
        <section className="edit-section">
          <AccountForm
            initialName={user?.name || ""}
            initialEmail={user?.email || ""}
          />
        </section>

        {/* Profile section: 5-6 photos, privacy, bio, location, contacts */}
        <section className="edit-section">
          <h2 className="section-heading">Profile Details &amp; Privacy</h2>
          <ProfileForm
            userName={user?.name || ""}
            initialData={
              profile
                ? {
                    bio: profile.bio || "",
                    address: profile.address || "",
                    city: profile.city || "",
                    region: profile.region || "",
                    district: profile.district || "",
                    localArea: profile.localArea || "",
                    country: profile.country || "India",
                    favColor: profile.favColor || "",
                    phone: profile.phone || "",
                    whatsapp: profile.whatsapp || "",
                    photoUrl: profile.photoUrl,
                    photos: profile.photos || [],
                    visibility: (profile.visibility as any) || "PUBLIC",
                    hidePhoneFromPublic: profile.hidePhoneFromPublic,
                    ageConfirmed: profile.ageConfirmed,
                    consentRecorded: profile.consentRecorded,
                    status: profile.status,
                    rejectionReason: profile.rejectionReason,
                  }
                : {}
            }
          />
        </section>
      </div>
    </main>
  );
}
