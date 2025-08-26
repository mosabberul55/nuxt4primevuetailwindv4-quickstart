import { useForm } from 'vee-validate';
import * as yup from 'yup';
export function useMcqStoreForm() {
    const { defineField, handleSubmit, resetForm, errors, setErrors } = useForm({
        validationSchema: yup.object({
            title: yup.string().required().max(255).label('Title'),
        }),
    });


    const [title] = defineField('title');
    const [order] = defineField('order')

    return {handleSubmit, resetForm, errors, setErrors, title, order};
}