"use client";
import ButtonForm from "@/components/button/Button";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import { FormField } from "@/components/dashboard/tutor/TutorComponents/InputField";
import { Book, Grid2X2 } from "lucide-react";

export default function Page() {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Subjects",
      link: "/dashboard/admin/manage/subjects",
    },
    {
      label: "Create Subjects",
      link: "/dashboard/admin/manage/subjects/creates",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title="Create Subjects">
        <Breadcrumb items={breadcrumbItems} />
        <form>
          <div className="w-full grid grid-rows-1">
            <div className="grid grid-rows-1 text-sm">
              <div className="md:grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6">
                <div>
                  <div>
                    <FormField
                      label="Subject Title"
                      type="text"
                      icon={<Book width={16} />}
                      placeholder="Subject title"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <label className="block text-sm mb-1 mt-4 text-white">
                        Description
                      </label>
                      <textarea
                        className="textarea border-neutral text-black w-full"
                        placeholder="Bio"
                        rows={1}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <ButtonForm type={"submit"} text={"Submit"} />
            </div>
          </div>
        </form>
      </DashboardLayoutAdmin>
    </>
  );
}
