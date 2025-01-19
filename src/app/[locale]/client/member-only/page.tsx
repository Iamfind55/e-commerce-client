import Breadcrumb from "@/components/breadCrumb";

export default function MemberOnly() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Members only", value: "/member-only" },
        ]}
      />
      <div className="bg-white w-full rounded-sm flex items-start justify-start flex-col mt-4 text-gray-500">
        <div className="w-full h-screen flex items-center justify-center bg-neon_pink">
          <h1 className="text-xl font-medium text-white">
            Tiktok Shop VIP System
          </h1>
        </div>
        <div className="w-full h-screen flex items-start justify-start flex-col gap-6 mt-6 px-6">
          <div className="rounded-xl p-4 bg-red-500">
            <p className="text-white text-sm font-thin">
              In order to thank everyone for their support and help to Tiktok
              Mall in the past time, the DHL VIP Mall system is now officially
              launched to give back to all the owners who support the mall! ! !
            </p>
          </div>
          <div className="w-full p-6 flex items-center justify-center">
            <h1 className="text-xl">Member privilege</h1>
          </div>
          <div className="w-full bg-neon_pink rounded-xl p-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="w-full flex items-center justify-center gap-4">
              <div className="rounded-full p-4 bg-white h-24 w-24 flex items-center justify-center">
                <h1 className="text-xl text-neon_pink ">SALE</h1>
              </div>
              <div className="flex items-start justify-start flex-col gap-4">
                <p className="text-white">No 1 Privillage</p>
                <div className="bg-white p-4 rounded-md flex items-center jusitfy-center">
                  <p className="text-neon_pink p-6">VIP level</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-4">
              <div className="rounded-full p-4 bg-white h-24 w-24 flex items-center justify-center">
                <h1 className="text-xl text-neon_pink ">SALE</h1>
              </div>
              <div className="flex items-start justify-start flex-col">
                <p className="text-white">No 1 Privillage</p>
                <div className="bg-white p-4 rounded-md flex items-center jusitfy-center">
                  <p className="text-neon_pink p-6">VIP level</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-4">
              <div className="rounded-full p-4 bg-white h-24 w-24 flex items-center justify-center">
                <h1 className="text-xl text-neon_pink ">SALE</h1>
              </div>
              <div className="flex items-start justify-start flex-col">
                <p className="text-white">No 1 Privillage</p>
                <div className="bg-white p-4 rounded-md flex items-center jusitfy-center">
                  <p className="text-neon_pink p-6">VIP level</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-4">
              <div className="rounded-full p-4 bg-white h-24 w-24 flex items-center justify-center">
                <h1 className="text-xl text-neon_pink ">SALE</h1>
              </div>
              <div className="flex items-start justify-start flex-col">
                <p className="text-white">No 1 Privillage</p>
                <div className="bg-white p-4 rounded-md flex items-center jusitfy-center">
                  <p className="text-neon_pink p-6">VIP level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
