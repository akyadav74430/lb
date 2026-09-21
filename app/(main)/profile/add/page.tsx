import EscortProfileForm from "@/components/EscortProfileForm";

export const metadata = {
  title: "Add New Profile — lovebite.com",
  description: "Create your professional escort profile on lovebite.com. Upload photos, set your rates and services, and reach thousands of clients.",
};

export default function AddProfilePage() {
  return (
    <main className="epf-page-main">
      <EscortProfileForm mode="add" />
    </main>
  );
}
