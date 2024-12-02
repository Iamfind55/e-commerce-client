import IconButton from "@/components/iconButton";
import { TrashIcon } from "@/icons/page";

export default function TwoFALoginDevices() {
  return (
    <div className="flex items-start justify-center flex-col gap-6">
      <div className="w-full flex items-center justify-start flex-col gap-3">
        <div className="w-full rounded bg-white p-4 shadow-md">
          <h4 className="text-b_text text-sm mb-3 font-bold">
            Two-steps verification:
          </h4>
          <h4 className="text-b_text text-sm mb-3">
            Two-factor authentication is not enabled yet.
          </h4>
          <p className="text-b_text text-xs">
            Two-factor authentication adds a layer of security to your account
            by requiring more than just a password to log in.
          </p>
          <IconButton
            className="rounded bg-primary text-white p-2 bg-base text-xs mt-4"
            title="Enable two-factor authentication"
            isFront={true}
            type="submit"
          />
        </div>
      </div>
      <div className="w-full rounded bg-white p-4 shadow-md">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Login devices history:
        </h4>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  BROWSER
                </th>
                <th scope="col" className="px-6 py-3">
                  DEVICES
                </th>
                <th scope="col" className="px-6 py-3">
                  LOCATION
                </th>
                <th scope="col" className="px-6 py-3">
                  RECENT ACTIVITIES
                </th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
