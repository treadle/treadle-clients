export default function calcQuaternions(roll, pitch, yaw) {
    const roll_sin = Math.sin(roll / 2.0);
    const roll_cos = Math.cos(roll / 2.0);
    const pitch_sin = Math.sin(pitch / 2.0);
    const pitch_cos = Math.cos(pitch / 2.0);
    const yaw_sin = Math.sin(yaw / 2.0);
    const yaw_cos = Math.cos(yaw / 2.0);

    const qy = roll_sin * pitch_cos * yaw_cos + roll_cos * pitch_sin * yaw_sin;
    const qx = -roll_cos * pitch_sin * yaw_cos + roll_sin * pitch_cos * yaw_sin;
    const qz = -roll_cos * pitch_cos * yaw_sin - roll_sin * pitch_sin * yaw_cos;
    const qw = roll_cos * pitch_cos * yaw_cos - roll_sin * pitch_sin * yaw_sin;

    return { qz, qy, qx, qw };
}
