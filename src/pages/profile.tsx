import { ProfileHero } from "../components/profile-hero";
import { useAuth } from "../contexts/auth-context";

export function ProfilePage() {
    const { user } = useAuth();

    return (

        <div>
            {/* todo: add navbar */}
            <ProfileHero username={user!}></ProfileHero>
        </div>
    )
}