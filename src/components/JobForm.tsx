import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Validation schema using Yup
const JobFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Title must be 50 characters or less")
    .required("Job title is required"),
  description: Yup.string()
    .max(16000, "Description must be 16KB or less")
    .required("Job description is required"),
  requirements: Yup.string().required("Job requirements are required"),
  salary: Yup.number().required("salary is required"),
  tags: Yup.array()
    .min(1, "Please add at least one tag")
    .required("Tags are required"),
  companyName: Yup.string().required("Company name is required"),
  contactEmail: Yup.string()
    .email("Invalid email address")
    .required("Contact email is required"),
});

interface FormValues {
  title: string;
  description: string;
  contactEmail: string;
  tags: string[];
  companyName: string;
  requirements: string;
  salary: Number;
}

const JobForm = () => {
  const { data } = useSession();
  const saveJobApplication = useCallback(
    async (values: FormValues) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/createJobs`,
          {
            method: "POST",
            body: JSON.stringify({
              jobTitle: values.title,
              jobDescription: values.description,
              jobRequirements: values.requirements,
              tags: values.tags,
              salary: values.salary,
              companyName: values.companyName,
              companyEmail: values.contactEmail,
              id: data?.user?.email,
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
        toast.error("Something went wrong");
      }
    },
    [data]
  );
  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          title: "",
          description: "",
          requirements: "",
          tags: [],
          companyName: "",
          salary: 0,
          contactEmail: "",
        }}
        validationSchema={JobFormSchema}
        resetForm
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          resetForm();
          saveJobApplication(values as FormValues);
        }}
      >
        {({
          isSubmitting,
          values,
          setFieldValue,
        }: {
          isSubmitting: boolean;
          values: FormValues;
          setFieldValue: Function;
        }) => (
          <Form className="p-6 bg-white shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">Post a New Job</h2>

            {/* Job Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">
                Job Title
              </label>
              <Field
                type="text"
                name="title"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter job title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Job Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Job Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter job description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Job Requirements */}
            <div className="mb-4">
              <label htmlFor="requirements" className="block font-medium mb-1">
                Job Requirements
              </label>
              <Field
                type="text"
                name="requirements"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter job requirements"
              />
              <ErrorMessage
                name="requirements"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label htmlFor="tags" className="block font-medium mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "Node.js", "Python", "Java"].map(
                  (tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag}
                        checked={values.tags.includes(tag)}
                        onChange={() => {
                          if (values.tags.includes(tag)) {
                            setFieldValue(
                              "tags",
                              values.tags.filter((t) => t !== tag)
                            );
                          } else {
                            setFieldValue("tags", [...values.tags, tag]);
                          }
                        }}
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <span>{tag}</span>
                    </label>
                  )
                )}
              </div>
              <ErrorMessage
                name="tags"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Company Name */}
            <div className="mb-4">
              <label htmlFor="companyName" className="block font-medium mb-1">
                Company Name
              </label>
              <Field
                type="text"
                name="companyName"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter company name"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label htmlFor="salary" className="block font-medium mb-1">
                Salary
              </label>
              <Field
                type="number"
                name="salary"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your salary"
              />
              <ErrorMessage
                name="salary"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Contact Email */}
            <div className="mb-4">
              <label htmlFor="contactEmail" className="block font-medium mb-1">
                Contact Email
              </label>
              <Field
                type="email"
                name="contactEmail"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter contact email"
              />
              <ErrorMessage
                name="contactEmail"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Post Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default JobForm;
