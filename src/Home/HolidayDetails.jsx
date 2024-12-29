import React from 'react';

function HolidayDetails({ holidayDetails }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold">{holidayDetails?.name}</h2>
      <p className="text-gray-600">{holidayDetails?.description}</p>
      <div className="text-sm">
        <strong>Type:</strong> {holidayDetails?.primary_type}
      </div>
      <div className="text-sm">
        <strong>Date:</strong> {holidayDetails?.date?.iso}
      </div>
      <div className="text-sm">
        <strong>Country:</strong> {holidayDetails?.country?.name} ({holidayDetails?.country?.id})
      </div>
      <div className="text-sm">
        <strong>Locations:</strong> {holidayDetails?.locations}
      </div>
      <div className="text-sm">
        <strong>States:</strong> {holidayDetails?.states}
      </div>
    </div>
  );
}

export default HolidayDetails;
