import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ProfileFormProps {
  onGitHubProfileChange: (username: string) => void;
}

interface FormProps {
  bio: string;
  salary: Number;
  skills: string;
  gitHubProfile: string;
  contactNumber: string;
}

// Define the validation schema using Yup
const ProfileFormSchema = Yup.object().shape({
  bio: Yup.string()
    .max(16000, "Description must be 16KB or less")
    .required("Job description is required"),
  salary: Yup.number()
    .required("Salary is required")
    .min(1, "Salary must be greater than 0"),
  skills: Yup.string().required("Please add at least one skill"),
  gitHubProfile: Yup.string().required("GitHub profile is required"),
  contactNumber: Yup.string().required("Contact number is required"),
});

const ProfileForm: FC<ProfileFormProps> = ({ onGitHubProfileChange }) => {
  const [gitHubProfile, setGitHubProfile] = useState<string>("");
  const { data } = useSession();
  const handleSaveProfile = async (values: FormProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/createUser`,
        {
          method: "POST",
          body: JSON.stringify({
            bio: values.bio,
            skills: values.skills,
            salary: values.salary,
            gitHubProfile: values.gitHubProfile,
            email: data?.user?.email,
            contactNumber: values.contactNumber,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const jsonResponse = await response.json();
      if (jsonResponse?.code === "Error") {
        toast.error("Something went wrong");
      } else {
        toast.success("Job saved succesfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues: {
      bio: "",
      salary: 0,
      skills: "",
      gitHubProfile: "",
      contactNumber: "",
    },
    validationSchema: ProfileFormSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      onGitHubProfileChange(values.gitHubProfile);
      handleSaveProfile(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Bio:</label>
          <textarea
            name="bio"
            onChange={formik.handleChange}
            value={formik.values.bio}
            className="border rounded p-2 w-full"
          />
          {formik.errors.bio && formik.touched.bio ? (
            <div className="text-red-500">{formik.errors.bio}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Salary per hour:</label>
          <input
            type="number"
            name="salary"
            onChange={formik.handleChange}
            value={formik.values.salary}
            className="border rounded p-2 w-full"
          />
          {formik.errors.salary && formik.touched.salary ? (
            <div className="text-red-500">{formik.errors.salary}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Skills (comma separated):</label>
          <input
            type="text"
            name="skills"
            onChange={formik.handleChange}
            value={formik.values.skills}
            className="border rounded p-2 w-full"
          />
          {formik.errors.skills && formik.touched.skills ? (
            <div className="text-red-500">{formik.errors.skills}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-2">GitHub Profile:</label>
          <input
            type="text"
            name="gitHubProfile"
            onChange={formik.handleChange}
            value={formik.values.gitHubProfile}
            className="border rounded p-2 w-full"
          />
          {formik.errors.gitHubProfile && formik.touched.gitHubProfile ? (
            <div className="text-red-500">{formik.errors.gitHubProfile}</div>
          ) : null}
          <button
            type="button"
            onClick={() => onGitHubProfileChange(formik.values.gitHubProfile)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Fetch Projects
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
            className="border rounded p-2 w-full"
          />
          {formik.errors.contactNumber && formik.touched.contactNumber ? (
            <div className="text-red-500">{formik.errors.contactNumber}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Profile
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
