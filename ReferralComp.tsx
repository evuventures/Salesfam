"use client"

import React, { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import cookie from "js-cookie"

export default function ReferralComp() {
  const searchParams = useSearchParams()
  const referral = searchParams.get("ref")
  useEffect(() => {
    if (referral) {
      cookie.set("ref", referral)
    }
  }, [referral])

  return <></>
}
