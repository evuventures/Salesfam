"use client"

import React, { useEffect, useState } from "react"
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  FileEdit,
  PlusCircle,
} from "lucide-react"

import { fetchCompanies } from "@/lib/company/company"
import { getBaseUrl } from "@/lib/getBaseUrl"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Button } from "../../../components/ui/button"
import { fetchUsers } from "../../../lib/fetchUsers"

export default function EditCompany(props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const companyId = props.id
  const { toast } = useToast()
  const [Loading, setLoading] = useState(false)
  const [companyLogo, setcompanyLogo] = useState()
  const [companyName, setcompanyName] = useState()
  const [companyType, setcompanyType] = useState()
  const [companyAddress, setcompanyAddress] = useState()
  const [companyEmail, setcompanyEmail] = useState()
  const [companyPhone, setcompanyPhone] = useState()
  const [overview, setOverview] = useState()
  const [rate, setRate] = useState()
  const [imagePreview, setimagePreview] = useState("")
  const [image, setImage] = useState("")
  const [company, setCompany] = useState()
  const [socialLink, setSocialLink] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  })
  console.log(socialLink)
  const handleSocialLink = (e) => {
    const { name, value } = e.target
    setSocialLink((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    fetch(`/api/company?id=${companyId}`)
      .then((response) => response.json())
      .then((data) => {
        setcompanyName(data.company.companyName)
        setcompanyType(data.company.companyType)
        setcompanyAddress(data.company.companyAddress)
        setcompanyEmail(data.company.companyEmail)
        setcompanyPhone(data.company.companyPhone)
        setOverview(data.company.overview)
        setRate(data.company.rate)
        setSocialLink(data.company.socialLink)
        setimagePreview(data.company.companyLogo)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [props])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setimagePreview(URL.createObjectURL(file))
    setImage(file)
  }

  const handleImageUpload = async (e) => {
    e.preventDefault()

    if (image) {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "p2y46g7e")
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/drzedrk1e/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
        if (response.ok) {
          const data = await response.json()
          handleEidtSubmit(data.url)
        } else {
          console.error("Error uploading image:", response.statusText)
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    } else {
      handleEidtSubmit(null)
    }
  }
  const handleEidtSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/company?id=${companyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyLogo: data,
          companyName,
          companyType,
          companyAddress,
          companyEmail,
          companyPhone,
          overview,
          rate,
          socialLink,
        }),
      })

      if (res.ok) {
        setLoading(false)
        console.log("company updated!")
        toast({
          title: "company updated",
        })
        window.location.reload()
      } else {
        console.log("company submit failed!")
        toast({
          variant: "destructive",
          title: "company submit failed!",
        })
        setLoading(false)
      }
    } catch (error) {
      console.log("Error during company submit:", error)
      toast({
        variant: "destructive",
        title: `Error during company submit:", ${error}`,
      })
      setLoading(false)
    }
  }
  function convertToLowerCase(inputString) {
    return inputString.toLowerCase()
  }
  return (
    <Dialog>
      <DialogTrigger>
        <FileEdit className="w-[20px] text-blue-600" />
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
          <DialogDescription>
            <div className="mb-2 grid w-full  items-center gap-1.5">
              <form className="" onSubmit={handleImageUpload}>
                <img className="w-10 h-10 mb-5" src={imagePreview} alt="" />
                <div>
                  <Label>Company Logo</Label>
                  <Input
                    id="picture"
                    className="mb-2 cursor-pointer"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-5 grid grid-cols-2 w-full items-center gap-1.5"></div>
                <div className="grid grid-cols-2 gap-x-2">
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={companyName}
                      type="text"
                      placeholder="Company Name"
                      onChange={(e) =>
                        setcompanyName(
                          convertToLowerCase(e.target.value.trim())
                        )
                      }
                    />
                  </div>
                  <div className="mb-5  gap-1.5">
                    <Label>Company Type</Label>
                    <Input
                      value={companyType}
                      type="text"
                      placeholder="Company Type"
                      onChange={(e) => setcompanyType(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-5  gap-1.5">
                    <Label>Company Address</Label>
                    <Input
                      value={companyAddress}
                      type="text"
                      placeholder="Company Address"
                      onChange={(e) => setcompanyAddress(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-5  gap-1.5">
                    <Label>Commission Rate</Label>
                    <Input
                      value={rate}
                      type="number"
                      placeholder="Company Rate"
                      onChange={(e) => setRate(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-5  gap-1.5">
                    <Label>Company Email</Label>
                    <Input
                      value={companyEmail}
                      type="text"
                      placeholder="Company Email"
                      onChange={(e) => setcompanyEmail(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-5  gap-1.5">
                    <Label>Company Phone</Label>
                    <Input
                      value={companyPhone}
                      type="text"
                      placeholder="Company Phone"
                      onChange={(e) => setcompanyPhone(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-5  gap-1.5 col-span-2">
                    <Label>Company Social Link</Label>
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="my-2">
                        <Label className="inline-block py-1">Facebook:</Label>
                        <Input
                          type="text"
                          placeholder="facebook link"
                          name="facebook"
                          value={socialLink.facebook}
                          onChange={handleSocialLink}
                        />
                      </div>
                      <div className="my-2">
                        <Label className="inline-block py-1">Twitter:</Label>
                        <Input
                          type="text"
                          placeholder="twitter link"
                          name="twitter"
                          value={socialLink.twitter}
                          onChange={handleSocialLink}
                        />
                      </div>
                      <div className="my-2">
                        <Label className="inline-block py-1">Instagram:</Label>
                        <Input
                          type="text"
                          placeholder="instagram link"
                          name="instagram"
                          value={socialLink.instagram}
                          onChange={handleSocialLink}
                        />
                      </div>
                      <div className="my-2">
                        <Label className="inline-block py-1">LinkedIn:</Label>
                        <Input
                          type="text"
                          placeholder="linkedin link"
                          name="linkedin"
                          value={socialLink.linkedin}
                          onChange={handleSocialLink}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5 gap-1.5">
                  <Label>Overview</Label>
                  <Textarea
                    value={overview}
                    placeholder="Company Overview"
                    rows={2}
                    onChange={(e) => setOverview(e.target.value.trim())}
                  ></Textarea>
                </div>
                <Button>
                  {Loading && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

