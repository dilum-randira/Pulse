import { ArrowRight, Globe, Heart, Mail, MessageCircle, Send, Sparkles, Users, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import romanticDate from '../assets/romantic-date.svg';

const steps = [
  {
    icon: Users,
    title: 'Create Profile',
    text: 'Set up your profile with photos and interests'
  },
  {
    icon: Sparkles,
    title: 'Discover Matches',
    text: 'Browse profiles and find your perfect match'
  },
  {
    icon: MessageCircle,
    title: 'Start Chatting',
    text: 'Connect with people who match your vibe'
  },
  {
    icon: Heart,
    title: 'Find Love',
    text: 'Build meaningful connections and relationships'
  }
];

const features = [
  {
    icon: Wand2,
    title: 'Smart Matching',
    text: 'Our algorithm finds your perfect matches based on compatibility'
  },
  {
    icon: Sparkles,
    title: 'Safe & Secure',
    text: 'Verified profiles and secure messaging to keep you safe'
  },
  {
    icon: Users,
    title: 'Real Connections',
    text: 'Meet genuine people looking for meaningful relationships'
  }
];

const reasons = [
  'Verified profiles for genuine connections',
  'Fast, intuitive matching algorithm',
  'Real-time messaging and notifications',
  'Privacy-first design you can trust'
];

function Home() {
  return (
    <div className="min-h-screen bg-pulse-light text-slate-800">
      <main>
        <section className="mx-auto max-w-7xl px-2 pt-2 sm:px-4 sm:pt-4 lg:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-100 bg-white shadow-xl">
            <img
              src={romanticDate}
              alt="Romantic dinner date under the moonlight"
              className="h-[620px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />

            <div className="absolute inset-x-0 top-0 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
              <div className="flex items-center justify-between rounded-[1.8rem] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
                <Link to="/" className="inline-flex items-center text-4xl font-black leading-none tracking-tight text-romantic-accent">
                  Pulse
                  <span className="text-romantic-primary">.</span>
                </Link>

                <nav className="hidden items-center gap-8 text-base font-semibold text-slate-700 lg:flex">
                  <a href="#" className="text-romantic-primary">Home</a>
                  <a href="#features" className="hover:text-romantic-primary">Browse Matches</a>
                  <a href="#why-pulse" className="hover:text-romantic-primary">Profile</a>
                  <a href="#footer" className="hover:text-romantic-primary">Messages</a>
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full px-6 py-2 text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full px-6 py-2 text-sm">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-0 flex h-full w-full items-center px-6 sm:px-10 lg:px-14">
              <div className="max-w-xl pt-20 sm:pt-24">
                <h1 className="text-4xl font-semibold italic leading-[1.05] text-romantic-accent sm:text-6xl lg:text-7xl">
                  A Hundred Roses,
                  <span className="block text-romantic-primary">A Million Dreams</span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-700">
                  Find your perfect match in a community of genuine people looking for meaningful
                  connections. Your love story begins here.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button className="rounded-full px-8 py-3 text-base">
                      <Heart className="mr-2 h-4 w-4" />
                      Join Free
                    </Button>
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-romantic-primary px-8 py-3 text-base font-semibold text-romantic-primary transition hover:bg-romantic-primary/10"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 inline-flex items-center gap-3 rounded-[1.6rem] bg-white/90 px-5 py-3 backdrop-blur">
                    <a href="#" className="rounded-full border border-rose-200 p-2 text-romantic-primary hover:bg-rose-50">
                      <Globe className="h-4 w-4" />
                  </a>
                  <a href="#" className="rounded-full border border-rose-200 p-2 text-romantic-primary hover:bg-rose-50">
                      <Mail className="h-4 w-4" />
                  </a>
                  <a href="#" className="rounded-full border border-rose-200 p-2 text-romantic-primary hover:bg-rose-50">
                      <Send className="h-4 w-4" />
                  </a>
                  <Link to="/register" className="rounded-full border border-rose-200 p-2 text-romantic-primary hover:bg-rose-50">
                    <Heart className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-romantic-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-romantic-accent sm:text-4xl">
              Your simple path to finding your next match
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              A smooth experience that keeps the focus on meeting people, not learning a complicated app.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-romantic-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-romantic-accent">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-5 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-romantic-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-romantic-accent">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                <Link to="/register" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-romantic-primary hover:underline">
                  Try now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="why-pulse" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid items-center gap-8 rounded-[2rem] border border-rose-100 bg-white p-6 shadow-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div className="overflow-hidden rounded-[1.75rem] border-4 border-rose-200 shadow-lg">
              <img
                src={romanticDate}
                alt="Couple on a romantic date"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-romantic-primary">Why choose Pulse</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-romantic-accent sm:text-4xl">
                A cleaner way to meet someone worth your time.
              </h2>

              <div className="mt-6 space-y-4">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3 rounded-2xl bg-rose-50/70 p-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-romantic-primary shadow-sm">
                      <Heart className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-6 text-gray-700">{reason}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/login">
                  <Button variant="outline" className="px-6 py-3 text-base">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="px-6 py-3 text-base">
                    Join Pulse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="mt-8 bg-[#111827] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-white">
              <span className="text-rose-300">Pulse</span>
              <span className="text-romantic-primary">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Meet, match, and message in a dating app designed to feel warm, simple, and modern.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">About</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li><a href="#how-it-works" className="hover:text-white">How it works</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#why-pulse" className="hover:text-white">Why Pulse</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">Access</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li><Link to="/login" className="hover:text-white">Log in</Link></li>
              <li><Link to="/register" className="hover:text-white">Sign up</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">Social</h3>
            <div className="mt-4 flex gap-3 text-slate-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">in</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">ig</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">fb</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
          © 2026 Pulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
