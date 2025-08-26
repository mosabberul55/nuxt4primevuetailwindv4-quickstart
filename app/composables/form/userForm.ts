import { useForm } from 'vee-validate';
import * as yup from 'yup';
export function useUserForm() {
    const {defineField, handleSubmit, resetForm, errors, setErrors} = useForm({
        validationSchema: yup.object({
            name: yup.string().required().label('Name'),
            phone: yup.string().required().matches(/^\d+$/, 'Phone must only contain numbers').length(11).label('Phone'),
            email: yup.string().email().nullable().label('Email'),
            password: yup.string().nullable().min(6).label('Password'),
            avatar: yup.string().nullable().label('Avatar'),
        }),
    });
    const [name] = defineField('name');
    const [phone] = defineField('phone');
    const [email] = defineField('email');
    const [password] = defineField('password');
    const [avatar] = defineField('avatar');

    return {errors, handleSubmit, setErrors, resetForm, name, phone, email, password, avatar };
}