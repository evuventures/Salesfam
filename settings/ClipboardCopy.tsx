import React, { useState } from "react"
import { Copy } from "lucide-react"

import { Button } from "../ui/button"

export default function ClipboardCopy(props) {
  const session = props.session

  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/signup?ref=${
          session && (session?.user?.name).replaceAll(" ", "_")
        }`
      )
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
    }
  }

  return (
    <div className="border rounded-full inline-flex items-center bg-gray-100">
      <span className="px-7">
        {process.env.NEXT_PUBLIC_NEXTAUTH_URL}/signup?ref=
        {session && (session?.user?.name).replaceAll(" ", "_")}
      </span>
      {/* <Button className="rounded-full px-10">
        <Copy size={20} />
        <span className="ml-2">Copy Link</span>
      </Button> */}

      {isCopied ? (
        <Button
          className="rounded-full w-[110px] ml-2 flex items-center"
          onClick={handleCopyClick}
        >
          <Copy size="20" />
          <span className="ml-2">Copied!</span>
        </Button>
      ) : (
        <Button
          className="rounded-full w-[100px] ml-2 flex items-center"
          onClick={handleCopyClick}
        >
          <Copy size="20" />
          <span className="ml-2">Copy</span>
        </Button>
      )}
    </div>
  )
}
