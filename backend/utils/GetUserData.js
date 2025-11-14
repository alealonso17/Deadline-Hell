import connection from "../db/connection.js";

export class GetUserData {

    static async getAll(email) {
        try {
            // 1) Buscar el usuario
            const [userRows] = await connection.execute(
                "SELECT id, username, email, created_at FROM users WHERE email = ?",
                [email]
            );

            if (userRows.length === 0) {
                return { ok: false, msg: "Usuario no encontrado" };
            }

            const user = userRows[0];  // Guardamos el usuario

            // 2) Buscar sus assessments
            const [assessments] = await connection.execute(
                "SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC",
                [user.id]
            );

            // 3) Por cada assessment, obtener los tasks
            for (let ass of assessments) {
                const [tasks] = await connection.execute(
                    "SELECT * FROM tasks WHERE assessment_id = ? ORDER BY id ASC",
                    [ass.id]
                );

                ass.tasks = tasks; // añadimos las tareas dentro del assessment
            }

            // 4) Respuesta final
            return {
                ok: true,
                user: user,
                assessments: assessments
            };

        } catch (error) {
            console.error(error);
            return { ok: false, msg: "Error al obtener los datos" };
        }
    }

}

export default GetUserData;