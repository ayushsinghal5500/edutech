import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label"; // ShadCN Label

export default function StudentSignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-r  flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Student Sign Up</h2>

        <form className="space-y-6">
          {/* Full Name input */}
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Email input */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Password input */}
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Confirm Password input */}
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Submit button */}
          <Button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300">
            Sign Up
          </Button>
        </form>

        {/* Footer with Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:text-teal-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
