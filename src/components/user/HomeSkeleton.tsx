const SkeletonLoader = () => (
    <div className="animate-pulse space-y-2">
        <div className="bg-gray-300 h-40 w-full"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

export default SkeletonLoader;