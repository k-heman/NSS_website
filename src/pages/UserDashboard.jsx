import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, ShieldAlert, Award, Clock, Activity, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function UserDashboard() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error('Failed to logout', e);
    }
  };

  const username = currentUser?.email?.replace('@nssrguktb.com', '').toUpperCase();

  useEffect(() => {
    // We can skip fetching attendance entirely if the user is an admin
    if (userRole === 'admin') {
      setLoadingAttendance(false);
      return;
    }

    const fetchAttendance = async () => {
      if (!username) return;
      try {
        setLoadingAttendance(true);
        const docRef = doc(db, 'Attendance', username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const dates = Object.keys(data).filter(key => key !== 'ID' && key !== 'FULL NAME');

          let presentCount = 0;
          let absentCount = 0;

          const records = dates.map(date => {
            const status = data[date];
            if (status === 'Present') presentCount++;
            else if (status === 'Absent') absentCount++;
            return { date, status };
          }).sort((a, b) => {
            const [d1, m1, y1] = a.date.split('-');
            const [d2, m2, y2] = b.date.split('-');
            return new Date(`${y2}-${m2}-${d2}`) - new Date(`${y1}-${m1}-${d1}`);
          });

          const totalSessions = presentCount + absentCount;
          const percentage = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
          const totalHours = presentCount * 3;

          setAttendance({
            records,
            totalHours,
            percentage,
            presentCount,
            absentCount,
            totalSessions
          });
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoadingAttendance(false);
      }
    };

    fetchAttendance();
  }, [username, userRole]);

  return (
    <div className="app-container">
      <div className="dashboard-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-header"
        >
          <div className="nav-title">
            <LayoutDashboard size={24} />
            NSS User Portal
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {userRole === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ShieldAlert size={16} />
                Admin Panel
              </button>
            )}
            <button onClick={handleLogout} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel"
          style={{ padding: '40px', marginBottom: '30px' }}
        >
          <h2 style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--primary-blue)' }}>
            Welcome, <span style={{ color: 'var(--active-green)' }}>{username}</span>!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            NSS Cell - RGUKT Basar
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Current Status Card - VISIBLE TO EVERYONE */}
            <div className="glass-panel" style={{ padding: '24px', boxShadow: 'none', border: '1px solid var(--gray-border)', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <Activity color="var(--tab-underline)" />
              <div>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '10px' }}>Current Status</h3>
                <p style={{ color: 'var(--text-muted)' }}>Registered Member</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Role: <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>{userRole}</span></p>
              </div>
            </div>

            {/* VOLUNTEER SPECIFIC CARDS - HIDDEN FROM ADMINS */}
            {userRole !== 'admin' && (
              <>
                <div className="glass-panel" style={{ padding: '24px', boxShadow: 'none', border: '1px solid var(--gray-border)', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <Clock color="var(--active-green)" />
                  <div>
                    <h3 style={{ color: 'var(--primary-blue)', marginBottom: '10px' }}>NSS Hours</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--active-green)' }}>
                        {loadingAttendance ? '-' : (attendance?.totalHours || 0)}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>Hrs completed</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', boxShadow: 'none', border: '1px solid var(--gray-border)', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <Calendar color="var(--primary-blue)" />
                  <div>
                    <h3 style={{ color: 'var(--primary-blue)', marginBottom: '10px' }}>Attendance</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: attendance?.percentage >= 75 ? 'var(--active-green)' : (attendance?.percentage < 50 ? 'var(--error-red)' : '#fbc02d') }}>
                        {loadingAttendance ? '-' : `${attendance?.percentage || 0}%`}
                      </span>
                    </div>
                    {!loadingAttendance && attendance && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {attendance.presentCount} / {attendance.totalSessions} Activities Attended
                      </p>
                    )}
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', boxShadow: 'none', border: '1px solid var(--gray-border)', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <Award color="#fbc02d" />
                  <div>
                    <h3 style={{ color: 'var(--primary-blue)', marginBottom: '10px' }}>Unit Number</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Unit 5</p>
                  </div>
                </div>
              </  >
            )}
          </div>
        </motion.div>

        {/* ATTENDANCE HISTORY - HIDDEN FROM ADMINS */}
        {userRole !== 'admin' && !loadingAttendance && attendance && attendance.records && attendance.records.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '40px' }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={28} />
              Attendance History
            </h2>
            <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {attendance.records.map((record, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: record.status === 'Present' ? 'rgba(76, 175, 80, 0.05)' : 'rgba(244, 67, 54, 0.05)',
                    border: `1px solid ${record.status === 'Present' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {record.status === 'Present' ? (
                      <CheckCircle color="var(--active-green)" size={24} />
                    ) : (
                      <XCircle color="var(--error-red)" size={24} />
                    )}
                    <span style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>{record.date}</span>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    backgroundColor: record.status === 'Present' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                    color: record.status === 'Present' ? 'var(--active-green)' : 'var(--error-red)'
                  }}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}