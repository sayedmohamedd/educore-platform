/* eslint-disable @next/next/no-img-element */
import {
  BadgeCheck,
  Download,
  MonitorPlay,
  PlayCircle,
  Smartphone,
} from "lucide-react";

const EnrollCourseAside = () => {
  return (
    <aside className="col-span-3">
      <div className="sticky top-20 overflow-hidden rounded-2xl bg-card shadow-md">
        {/* Course Preview */}
        <div className="relative aspect-video bg-muted">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="Course Preview"
            className="h-full w-full object-cover"
          />

          <button className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/50">
            <PlayCircle
              className="fill-white text-white"
              size={64}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Price */}
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Bestseller
            </span>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold">$89.99</span>

              <span className="text-lg text-muted-foreground line-through">
                $149.99
              </span>
            </div>

            <p className="text-sm font-medium text-red-500">
              Offer ends in 12 hours!
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90">
              Enroll Now
            </button>

            <button className="w-full rounded-xl border border-primary py-3 font-semibold text-primary transition hover:bg-primary/5">
              Add to Cart
            </button>
          </div>

          {/* Includes */}
          <div className="border-t pt-6">
            <h4 className="mb-4 font-semibold">This course includes:</h4>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <PlayCircle className="h-5 w-5 text-primary" />
                <span>24 hours on-demand video</span>
              </li>

              <li className="flex items-center gap-3">
                <Download className="h-5 w-5 text-primary" />
                <span>15 downloadable resources</span>
              </li>

              <li className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span>Full lifetime access</span>
              </li>

              <li className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <span>Access on mobile & TV</span>
              </li>

              <li className="flex items-center gap-3">
                <MonitorPlay className="h-5 w-5 text-primary" />
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EnrollCourseAside;
