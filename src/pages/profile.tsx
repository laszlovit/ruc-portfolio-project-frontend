import { ProfileHero } from "../components/ProfileHero";
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