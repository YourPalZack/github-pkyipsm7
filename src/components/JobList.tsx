import React, { useState, useMemo } from 'react';
import JobCard from './JobCard';
import { jobs } from '../data/jobs';
import { compareDesc, parseISO } from 'date-fns';

interface JobListProps {
  selectedCategory: string;
  selectedState: string;
}

const JOBS_PER_PAGE = 5;

const JobList: React.FC<JobListProps> = ({ selectedCategory, selectedState }) => {
  const [visibleJobs, setVisibleJobs] = useState(JOBS_PER_PAGE);

  // Sort and filter jobs
  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter(job => {
      const categoryMatch = selectedCategory === 'All' || job.category === selectedCategory;
      const stateMatch = selectedState === 'ALL' || job.state === selectedState;
      return categoryMatch && stateMatch;
    });

    // Sort by date (newest first)
    return filtered.sort((a, b) => 
      compareDesc(parseISO(a.postedAt), parseISO(b.postedAt))
    );
  }, [selectedCategory, selectedState]);

  const handleLoadMore = () => {
    setVisibleJobs(prev => prev + JOBS_PER_PAGE);
  };

  const displayedJobs = filteredJobs.slice(0, visibleJobs);
  const hasMoreJobs = visibleJobs < filteredJobs.length;

  return (
    <div className="space-y-8 mb-12">
      {filteredJobs.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {hasMoreJobs && (
            <div className="text-center pt-6">
              <button
                onClick={handleLoadMore}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 inline-flex items-center"
              >
                Load More Jobs
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobList;