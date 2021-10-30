import { Form, FormControl } from "components/Form"
import Layout from "components/Layout"
import { NextPage } from "next"
import { getCsrfToken } from "next-auth/react"

const formControls = [
  { label: "username", placeholder: "Unique Username", type: "text" },
  {
    label: "Password",
    placeholder: "8 or more characters Password",
    type: "password",
  },
  { label: "Full Name", placeholder: "Your Full Name", type: "text" },
]

const SignUp: NextPage = () => {
  return (
    <div>
      <Layout title="Sign Up">
        <Form
          onSubmit={(e) => console.log(e)}
          initialValues={{ username: "", password: "", fullName: "" }}
        >
          {formControls.map((form, i) => (
            <FormControl
              key={i}
              label={form.label}
              placeholder={form.placeholder}
              type={form.type}
            />
          ))}
        </Form>
      </Layout>
    </div>
  )
}

export default SignUp
