import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark1 text-white">
      <h1 className="text-6xl font-title mb-4">404ant too fat</h1>

      <p className="text-lg font-body mb-8">Tu t&apos;es perdu la ?</p>
      <Link href="/">
        <button className="bg-greenPrimary text-white font-body px-6 py-3 rounded-lg hover:bg-green-700 transition-all">
          Je reviens casi
        </button>
      </Link>
    </div>
  );
}
