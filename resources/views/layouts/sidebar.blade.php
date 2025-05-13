<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ Auth::user()->role === 'doctor' ? route('doctor.dashboard') : route('patient.dashboard') }}" class="nav-link">
        <img src="{{ asset('assets/1.png') }}" alt="Logo" class="brand-image img-circle elevation-3" style="width: 70px; height: auto;">
        <span class="brand-text font-weight-light">
            @if(Auth::user()->role === 'doctor')
                Doctor Panel
            @elseif(Auth::user()->role === 'patient')
                Patient Panel
            @else
                Dashboard
            @endif
        </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                
                <!-- Shared Dashboard -->
                <li class="nav-item">
                    <a href="{{ Auth::user()->role === 'doctor' ? route('doctor.dashboard') : route('patient.dashboard') }}" class="nav-link">
                        <i class="nav-icon fas fa-home"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <!-- Doctor Menu -->
                @if(Auth::user()->role === 'doctor')
                    <li class="nav-item">
                        <a href="{{ route('doctor.patients') }}" class="nav-link">
                            <i class="nav-icon fas fa-user-injured"></i>
                            <p>Patients</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('doctor.appointments') }}" class="nav-link">
                            <i class="nav-icon fas fa-calendar-check"></i>
                            <p>Appointments</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('doctor.medical-records') }}" class="nav-link">
                            <i class="nav-icon fas fa-file-medical"></i>
                            <p>Medical Records</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('doctor.prescriptions') }}" class="nav-link">
                            <i class="nav-icon fas fa-prescription-bottle"></i>
                            <p>Prescriptions</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('doctor.messages') }}" class="nav-link">
                            <i class="nav-icon fas fa-comments"></i>
                            <p>Messages</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('doctor.profile') }}" class="nav-link">
                            <i class="nav-icon fas fa-user-md"></i>
                            <p>Profile</p>
                        </a>
                    </li>

                <!-- Patient Menu -->
                @elseif(Auth::user()->role === 'patient')
                    <li class="nav-item">
                        <a href="{{ route('patient.appointment.index') }}" class="nav-link">
                            <i class="nav-icon fas fa-calendar-alt"></i>
                            <p>Appointments</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('patient.record.index') }}" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p>Records</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('patient.message.index') }}" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p>Messages</p>
                        </a>
                    </li>
                @endif

                <!-- Logout -->
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="nav-icon fas fa-sign-out-alt"></i>
                        <p>Sign out</p>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </li>
            </ul>
        </nav>
    </div>
</aside>
