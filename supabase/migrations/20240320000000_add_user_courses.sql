-- Create user_courses table
create table public.user_courses (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    has_access boolean default false not null
);

-- Enable RLS
alter table public.user_courses enable row level security;

-- Create policies
create policy "Users can view their own course access"
    on public.user_courses for select
    using (auth.uid() = user_id);

create policy "Users can update their own course access"
    on public.user_courses for update
    using (auth.uid() = user_id);

create policy "Service role can manage all course access"
    on public.user_courses for all
    using (auth.role() = 'service_role');

-- Create function to automatically create user_courses entry
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.user_courses (user_id, has_access)
    values (new.id, false);
    return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create index for faster lookups
create index idx_user_courses_user_id on public.user_courses(user_id); 