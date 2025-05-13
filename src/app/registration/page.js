"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Register() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-teal-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">
            {role === "student"
              ? "🎓 Student Registration"
              : "👨🏫 Mentor Registration"}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          {/* Role Toggle */}
          <div className="mb-8 flex items-center">
            <p className="mb-2 text-sm font-medium text-gray-700 mr-3">
              Choose your type
            </p>
            <div className="flex">
              <ToggleGroup
                type="single"
                value={role}
                onValueChange={(val) => setRole(val || "student")}
                className="bg-teal-50 rounded-full p-1"
              >
                <ToggleGroupItem
                  value="student"
                  className="data-[state=on]:bg-teal-600 data-[state=on]:text-white rounded-full px-6"
                >
                  Student
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="mentor"
                  className="data-[state=on]:bg-teal-600 data-[state=on]:text-white rounded-full px-6"
                >
                  Mentor
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <form className="space-y-6">
            {/* Common Fields */}
            <div className="space-y-4">
  <h3 className="text-lg font-semibold text-teal-800 mb-4">
    Basic Information
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="firstName" className="text-teal-800">
        First Name *
      </Label>
      <Input
        id="firstName"
        placeholder="John"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="lastName" className="text-teal-800">
        Last Name *
      </Label>
      <Input
        id="lastName"
        placeholder="Doe"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="email" className="text-teal-800">
        Email *
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="john.doe@example.com"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="phone" className="text-teal-800">
        Phone *
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+91 98765 43210"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="dob" className="text-teal-800">
        Date of Birth *
      </Label>
      <Input
        id="dob"
        type="date"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="street" className="text-teal-800">
        Street Address *
      </Label>
      <Input
        id="street"
        placeholder="123 Main St"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="city" className="text-teal-800">
        City *
      </Label>
      <Input
        id="city"
        placeholder="City Name"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="state" className="text-teal-800">
        State *
      </Label>
      <Input
        id="state"
        placeholder="State Name"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="country" className="text-teal-800">
        Country *
      </Label>
      <Input
        id="country"
        placeholder="Country Name"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
    <div>
      <Label htmlFor="postalCode" className="text-teal-800">
        Postal Code *
      </Label>
      <Input
        id="postalCode"
        placeholder="123456"
        className="mt-1 focus:ring-teal-500"
      />
    </div>
  </div>
</div>


            <Separator className="my-8 bg-teal-100" />

            {/* Role-Specific Fields */}
            {role === "student" ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">
                  Academic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jeeType" className="text-teal-800 mb-3">
                      JEE Type *
                    </Label>
                    <Select>
                      <SelectTrigger className="focus:ring-teal-500 w-full">
                        <SelectValue placeholder="Select JEE Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">JEE Main</SelectItem>
                        <SelectItem value="advanced">JEE Advanced</SelectItem>
                        <SelectItem value="both">JEE Main + Advanced</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school" className="text-teal-800 mb-3">
                      School Name *
                    </Label>
                    <Input
                      id="school"
                      placeholder="Delhi Public School"
                      className="mt-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="board" className="text-teal-800 mb-3">
                      Board *
                    </Label>
                    <Select>
                      <SelectTrigger className="focus:ring-teal-500 w-full">
                        <SelectValue placeholder="Select Board" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cbse">CBSE</SelectItem>
                        <SelectItem value="icse">ICSE</SelectItem>
                        <SelectItem value="state">State Board</SelectItem>
                        <SelectItem value="ib">IB</SelectItem>
                        <SelectItem value="cambridge">Cambridge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="class" className="text-teal-800 mb-3">
                      Class *
                    </Label>
                    <Select>
                      <SelectTrigger className="focus:ring-teal-500 w-full">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="11">11th</SelectItem>
                        <SelectItem value="12">12th</SelectItem>
                        <SelectItem value="dropper">Dropper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-teal-800">
                      Experience (Years) *
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="5"
                      className="mt-1 focus:ring-teal-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution" className="text-teal-800">
                      Institution *
                    </Label>
                    <Input
                      id="institution"
                      placeholder="IIT Delhi"
                      className="mt-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertise" className="text-teal-800">
                      Expertise *
                    </Label>
                    <Input
                      id="expertise"
                      placeholder="Quantum Physics, Organic Chemistry"
                      className="mt-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="charges" className="text-teal-800">
                      Hourly Rate (₹) *
                    </Label>
                    <Input
                      id="charges"
                      type="number"
                      placeholder="500"
                      className="mt-1 focus:ring-teal-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="bg-teal-50 p-6">
          <div className="w-full space-y-0">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg">
              Complete Registration →
            </Button>
            <p className="text-center text-sm text-teal-800">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold hover:text-teal-600 underline"
              >
                Login here
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
