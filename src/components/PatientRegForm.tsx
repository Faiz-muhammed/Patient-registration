import { useState } from 'react';
import { Plus, User } from 'lucide-react';
import InputField from './InputField';

const DEFAULT_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: ''
}

const PatientRegForm = () => {
  const [formData, setFormData] = useState<any>(DEFAULT_FORM_DATA);
  
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev:any) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
  // 
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Register New Patient
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            handleInputChange={handleInputChange}
            value={formData["firstName"]}
            error={errors["firstName"]}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            handleInputChange={handleInputChange}
            value={formData["lastName"]}
            error={errors["lastName"]}
            required
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          handleInputChange={handleInputChange}
          value={formData["email"]}
          error={errors["email"]}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            handleInputChange={handleInputChange}
            value={formData["phone"]}
            error={errors["phone"]}

          />
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            handleInputChange={handleInputChange}
            value={formData["dateOfBirth"]}
            error={errors["dateOfBirth"]}
          />
        </div>

        <InputField
          label="Gender"
          name="gender"
          options={['Male', 'Female', 'Other']}
          handleInputChange={handleInputChange}
          value={formData["gender"]}
          error={errors["gender"]}
        />

        <InputField
          label="Address"
          name="address"
          type="textarea"
          handleInputChange={handleInputChange}
          value={formData["address"]}
          error={errors["address"]}
        />

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Registering...
            </>
          ) : (
            <>
              <User className="w-4 h-4 mr-2" />
              Register Patient
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PatientRegForm;