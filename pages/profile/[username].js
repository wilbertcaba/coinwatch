
import { useRouter } from "next/router";


const Profile = () => {
    const router = useRouter();

    const {username} = router.query; // Equals const name = router.query.username;

    return (
        <div className="cointainer">
            <div>Hello {username}!</div>
        </div>
    )
}

export default Profile;