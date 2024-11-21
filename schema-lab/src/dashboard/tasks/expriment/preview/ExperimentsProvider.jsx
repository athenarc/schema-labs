import React, { createContext, useContext, useEffect, useState } from "react";
import { getExperiments } from "../../../../api/v1/actions";
import { UserDetailsContext } from "../../../../utils/components/auth/AuthProvider";
import { useClientPreferences } from "../../../../client/ClientPreferencesProvider";

export const ExperimentsContext = createContext();

export const useExperimentsData = () => {
    const { ExperimentData } = useContext(ExperimentsContext);
    return { ExperimentData };
};

export const useExperimentFilters = () => {
    const { ExperimentFilters, setExperimentFilters } = useContext(ExperimentsContext);
    return { ExperimentFilters, setExperimentFilters };
};

const ExperimentsProvider = ({ children }) => {
    const { clientPreferences } = useClientPreferences();
    const { pageSize } = clientPreferences;
    const [ExperimentData, setExperimentData] = useState({ count: 0, results: [] }); 
    const [ExperimentFilters, setExperimentFilters] = useState({
        token: "",
        order: "-created_at",
        page: 0
    });

    const { userDetails } = useContext(UserDetailsContext);
    const refreshInterval = 5000;

    const fetchExperimentData = () => {
        const filters = {
            ...ExperimentFilters,
            view: "detailed",
            limit: pageSize,
            offset: ExperimentFilters.page * pageSize,
        };
    
        getExperiments({
            filters,
            auth: userDetails.apiKey,
        }).then((data) => {
            if (data) {
                // Group records by page size if necessary
                const paginatedResults = data.results.slice(
                    ExperimentFilters.page * pageSize,
                    (ExperimentFilters.page + 1) * pageSize
                );

                setExperimentData({
                    count: data.count || 0,
                    results: paginatedResults || [],
                });
            } else {
                console.error("Unexpected data format:", data);
                setExperimentData({ count: 0, results: [] });
            }
        })
        .catch((error) => {
            console.error("Error fetching experiments:", error);
            setExperimentData({ count: 0, results: [] });
        });
    };
    

    useEffect(() => {
        fetchExperimentData();
    }, [ExperimentFilters]);

    useEffect(() => {
        const intervalId = setInterval(fetchExperimentData, refreshInterval);
        return () => clearInterval(intervalId);
    }, [ExperimentFilters]);

    return (
        <ExperimentsContext.Provider value={{ ExperimentData, setExperimentData, ExperimentFilters, setExperimentFilters }}>
            {children}
        </ExperimentsContext.Provider>
    );
};

export default ExperimentsProvider;
