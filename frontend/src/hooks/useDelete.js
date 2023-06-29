import client from "../api";

function useDelete() {
    const deleteUser = async (id, role, callback = null) => {
        const confirm = window.confirm('Are you sure?');

        if (!confirm) {
            return;
        }

        try {

            switch (role) {
                case 'student':
                    await client.delete('/students/' + id);
                    break;
                case 'counsellor':
                    await client.delete('/counsellors/' + id);
                    break;
                case 'parent':
                    await client.delete('/parents/' + id);
                    break;
                default:
                    throw new Error('Invalid role!');
            }


            if (callback) {
                callback();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return { deleteUser };
}

export default useDelete;