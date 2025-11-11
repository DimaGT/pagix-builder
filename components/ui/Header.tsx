"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUser } from "@/app/actions/actions"
import { UserMenu } from "./user-menu"
import { useTranslations } from "next-intl"

export default  function Header({user}:{user:any}) {
  const tNav = useTranslations("nav");


//   console.log("user on header", user)

  console.log("user",user)

  return (
    <header className="border-b border-border">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold">{tNav("brand")}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {user.user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{tNav("signIn")}</Button>
                </Link>
                <Link href="/signup">
                  <Button>{tNav("getStarted")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}