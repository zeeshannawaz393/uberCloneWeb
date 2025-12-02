import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DriverOnboardingState {
    // Step 1: City
    city: string;

    // Step 2: Personal Details
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    addressCity: string;
    postcode: string;

    // Step 3: Licences (base64 strings - NOT persisted to localStorage)
    pcoLicenceFront: string | null;
    pcoLicenceBack: string | null;
    drivingLicenceFront: string | null;
    drivingLicenceBack: string | null;
    dvlaCheckCode: string;

    // Step 4: Identity
    profilePhoto: string | null;
    nationalInsurance: string;

    // Step 5: Vehicle
    vehicleReg: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    phvLicence: string | null;
    insurance: string | null;
    mot: string | null;
    v5c: string | null;

    // Step 6: Payout
    sortCode: string;
    accountNumber: string;
    accountHolderName: string;

    // Step 7: Review
    consentBackgroundCheck: boolean;
    consentTerms: boolean;

    // Current step tracker
    currentStep: number;

    // Actions
    setCity: (city: string) => void;
    setPersonalData: (data: Partial<Pick<DriverOnboardingState, 'firstName' | 'lastName' | 'dateOfBirth' | 'phoneNumber' | 'addressLine1' | 'addressLine2' | 'addressCity' | 'postcode'>>) => void;
    setLicenceData: (data: Partial<Pick<DriverOnboardingState, 'pcoLicenceFront' | 'pcoLicenceBack' | 'drivingLicenceFront' | 'drivingLicenceBack' | 'dvlaCheckCode'>>) => void;
    setIdentityData: (data: Partial<Pick<DriverOnboardingState, 'profilePhoto' | 'nationalInsurance'>>) => void;
    setVehicleData: (data: Partial<Pick<DriverOnboardingState, 'vehicleReg' | 'vehicleMake' | 'vehicleModel' | 'vehicleYear' | 'phvLicence' | 'insurance' | 'mot' | 'v5c'>>) => void;
    setPayoutData: (data: Partial<Pick<DriverOnboardingState, 'sortCode' | 'accountNumber' | 'accountHolderName'>>) => void;
    setConsent: (data: Partial<Pick<DriverOnboardingState, 'consentBackgroundCheck' | 'consentTerms'>>) => void;
    setCurrentStep: (step: number) => void;
    reset: () => void;
}

const initialState = {
    city: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    postcode: '',
    pcoLicenceFront: null,
    pcoLicenceBack: null,
    drivingLicenceFront: null,
    drivingLicenceBack: null,
    dvlaCheckCode: '',
    profilePhoto: null,
    nationalInsurance: '',
    vehicleReg: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    phvLicence: null,
    insurance: null,
    mot: null,
    v5c: null,
    sortCode: '',
    accountNumber: '',
    accountHolderName: '',
    consentBackgroundCheck: false,
    consentTerms: false,
    currentStep: 1,
};

// Custom storage that excludes file fields (base64 strings)
const customStorage = {
    getItem: (name: string) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return str;
    },
    setItem: (name: string, value: string) => {
        const state = JSON.parse(value);

        // Remove base64 file fields before saving to localStorage
        const {
            pcoLicenceFront,
            pcoLicenceBack,
            drivingLicenceFront,
            drivingLicenceBack,
            profilePhoto,
            phvLicence,
            insurance,
            mot,
            v5c,
            ...persistedState
        } = state.state;

        // Save only text data
        const minimal = {
            state: persistedState,
            version: state.version
        };

        localStorage.setItem(name, JSON.stringify(minimal));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

export const useDriverOnboarding = create<DriverOnboardingState>()(
    persist(
        (set) => ({
            ...initialState,

            setCity: (city) => set({ city }),

            setPersonalData: (data) => set((state) => ({ ...state, ...data })),

            setLicenceData: (data) => set((state) => ({ ...state, ...data })),

            setIdentityData: (data) => set((state) => ({ ...state, ...data })),

            setVehicleData: (data) => set((state) => ({ ...state, ...data })),

            setPayoutData: (data) => set((state) => ({ ...state, ...data })),

            setConsent: (data) => set((state) => ({ ...state, ...data })),

            setCurrentStep: (step) => set({ currentStep: step }),

            reset: () => set(initialState),
        }),
        {
            name: 'driver-onboarding-storage',
            storage: createJSONStorage(() => customStorage),
            // Partition - files stay in memory, text data persists
            partialize: (state) => ({
                // Only persist text fields
                city: state.city,
                firstName: state.firstName,
                lastName: state.lastName,
                dateOfBirth: state.dateOfBirth,
                phoneNumber: state.phoneNumber,
                addressLine1: state.addressLine1,
                addressLine2: state.addressLine2,
                addressCity: state.addressCity,
                postcode: state.postcode,
                dvlaCheckCode: state.dvlaCheckCode,
                nationalInsurance: state.nationalInsurance,
                vehicleReg: state.vehicleReg,
                vehicleMake: state.vehicleMake,
                vehicleModel: state.vehicleModel,
                vehicleYear: state.vehicleYear,
                sortCode: state.sortCode,
                accountNumber: state.accountNumber,
                accountHolderName: state.accountHolderName,
                consentBackgroundCheck: state.consentBackgroundCheck,
                consentTerms: state.consentTerms,
                currentStep: state.currentStep,
                // Files are excluded - they stay in memory only
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate driver onboarding state:', error);
                }
            },
        }
    )
);
