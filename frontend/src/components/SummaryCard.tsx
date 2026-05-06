console.log("NEW CARD LOADED");

interface Props {
  data: {
    scope: string;
    core: string;
    obligations: string;
    exceptions: string;
    penalties: string;
  };
}

export default function SummaryCard({ data }: Props) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <Card title="Scope" content={data.scope} />
      <Card title="Core" content={data.core} />
      <Card title="Obligations" content={data.obligations} />
      <Card title="Exceptions" content={data.exceptions} />
      <Card title="Penalties" content={data.penalties} />
    </div>
  );
}

function Card({ title, content }: any) {
  if (!content) return null;

  return (
    <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all shadow-md">
      <h3 className="text-lg font-semibold text-blue-400 mb-3">
        {title}
      </h3>

      <p className="text-gray-300 leading-relaxed text-left">
        {content}
      </p>
    </div>
  );
}