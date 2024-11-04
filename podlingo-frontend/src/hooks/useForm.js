import { useState, useCallback } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setLoading(true);
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return false;
    }
    
    try {
      await onSubmit(values);
      return true;
    } catch (err) {
      setErrors({ submit: err.message });
      return false;
    } finally {
      setLoading(false);
    }
  }, [values, validate]);

  return { values, errors, loading, handleChange, handleSubmit };
}; 