import DonacionesForm from "./DonacionesForms";
import DonacionesList from "./DonacionesList";

export default function Donaciones() {
  return (
    <div className="p-6 space-y-12">
      <DonacionesForm />
      <DonacionesList />
    </div>
  );
}
